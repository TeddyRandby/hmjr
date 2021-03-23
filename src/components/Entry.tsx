import React, {useEffect} from "react"
import {Date} from "./Date"
import {List} from "./List"
import {Button, Box, Input, Textarea, FormControl, FormLabel, VStack, Text, ButtonGroup, HStack, Center} from "@chakra-ui/react";
import {Index} from "./Index";
import {useReactiveVar, useMutation} from "@apollo/client";
import {currentEntryVar, changedHeaderVar, changedContentVar, changedDatesVar, changedIndexesVar, bookNumberVar } from "../cache";
import {UPDATE_ENTRY, DELETE_ENTRY, CREATE_ENTRY} from "../queries/Entries";

interface EntryProps {
  doDelete: () => void;
  doCreate: (id: string) => number;
  doUpdate: (entry: any) => void;
}

export const Entry = (props: EntryProps) => {
  const [updateEntry] = useMutation(UPDATE_ENTRY);
  const [deleteEntry] = useMutation(DELETE_ENTRY);
  const [createEntry] = useMutation(CREATE_ENTRY);

  const entry = useReactiveVar(currentEntryVar)
  const book = useReactiveVar(bookNumberVar)
  const changedHeader = useReactiveVar(changedHeaderVar);
  const changedContent = useReactiveVar(changedContentVar);
  const changedDates = useReactiveVar(changedDatesVar);
  const changedIndexes = useReactiveVar(changedIndexesVar);

  const doReset = () => {
    changedHeaderVar(undefined);
    changedContentVar(undefined);
    changedDatesVar(undefined);
    changedIndexesVar(undefined);
  }

  useEffect(()=>{
    doReset();
  },[book])

  const doCreate = async () => {
    console.log(book);
    const {data} = await createEntry({variables: {book}});
    if (data)
      props.doCreate(data.createEntry._id);
  }

  if (!entry){
    return <Box>
      <Center p={10}>
      <HStack>
      <Text>No entry found.</Text>
      <Button onClick={doCreate}>Create one</Button>
        </HStack>
        </Center>
  </Box>
}
  const header = changedHeader===undefined?entry.header:changedHeader;
  const content = changedContent===undefined?entry.content:changedContent;
  const dates = changedDates===undefined?entry.dates:changedDates;
  const indexes = changedIndexes===undefined?entry.indexes:changedIndexes;

  const addDate= () => {
    const newDates =  [...dates,{day: "0", month:"0", year:"0", content:"", stringified:""}];
    changedDatesVar(newDates);
  }

  const addIndex= () => {
    const newIndexes =  [...indexes,{book: "", page:"", content:""}];
    changedIndexesVar(newIndexes);
  }

  const removeDate = (at: number) => {
    const newDates =  dates.slice();
    newDates.splice(at,1);
    changedDatesVar(newDates);
  }

  const removeIndex= (at: number) => {
    const newIndexes =  indexes.slice();
    newIndexes.splice(at,1);
    changedIndexesVar(newIndexes);
  }

  const updateDate = (at: number) => (updated: any) => {
    const newDates = dates.slice();
    newDates.splice(at ,1, updated);
    changedDatesVar(newDates);
  }

  const updateIndex = (at: number) => (updated: any) => {
    const newIndexes = indexes.slice();
    newIndexes.splice(at ,1, updated);
    changedIndexesVar(newIndexes);
  }



  const doUpdate = () => {
    updateEntry({variables: {id: entry._id, updated: {
      header: header,
      content: content,
      dates: dates.map(date=>({day: parseInt(date.day), month: parseInt(date.month), year: parseInt(date.year), content: date.content, stringified: date.stringified})),
      indexes: indexes.map(index=>({book: index.book, page: index.page, content: index.content}))
    }}})

    props.doUpdate({
      ...entry,
      header: header,
      content: content,
      dates: dates,
      indexes: indexes
    })
    
    doReset();
  }

  const doDelete = () => {
    deleteEntry({variables: { id: entry._id }})
    props.doDelete();
  }

  const edited = changedHeader || changedContent || changedIndexes || changedDates
  const color = edited ? "green" : "gray";

  return <Box p={4} d={"flex"} border={"5px solid " + color} key={entry.book + entry.header}>
    <VStack p={2}>
      <Text>Entry</Text>
    <FormControl>
      <FormLabel>Header</FormLabel>
      <Input value={header} onChange={(event)=>changedHeaderVar(event.target.value)}/>
    </FormControl>
    <FormControl>
      <FormLabel>Content</FormLabel>
      <Textarea value={content} onChange={(event)=>changedContentVar(event.target.value)} />
    </FormControl>
    <FormControl>
      <ButtonGroup>
        <Button onClick={doUpdate}>Update</Button>
        <Button onClick={doReset}>Reset</Button>
        <Button onClick={doDelete} colorScheme={"red"}>Delete</Button>
      </ButtonGroup>
    </FormControl>
    <FormControl>
        <FormLabel>Locations</FormLabel>
        <List data={entry.locations}/>
    </FormControl>
    <FormControl>
        <FormLabel>Organizations</FormLabel>
        <List data={entry.organizations}/>
    </FormControl>
    <FormControl>
        <FormLabel>People</FormLabel>
        <List data={entry.people}/>
    </FormControl>
    </VStack>
    <VStack p={2}>
      <Text>Dates <Button onClick={addDate} colorScheme={"blue"}>+</Button></Text>
      {dates.map((date:any, i: number)=><Date date={date} at={i} delete={()=>removeDate(i)} update={updateDate(i)}/>)}
    </VStack>
    <VStack p={2}>
      <Text>Indexes <Button onClick={addIndex} colorScheme={"blue"}>+</Button></Text>
      {indexes.map((index:any, i: number)=><Index index={index} at={i} delete={()=>removeIndex(i)} update={updateIndex(i)}/>)}
    </VStack>
  </Box>

}
