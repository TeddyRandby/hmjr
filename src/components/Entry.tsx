import React from "react"
import {Date} from "./Date"
import {Button, Box, Input, Textarea, FormControl, FormLabel, VStack, Text, ButtonGroup} from "@chakra-ui/react";
import {Index} from "./Index";
import {useReactiveVar, useMutation} from "@apollo/client";
import {currentEntryVar, changedHeaderVar, changedContentVar, changedDatesVar, changedIndexesVar} from "../cache";
import {UPDATE_ENTRY} from "../queries/Entries";

export const Entry = () => {
  const [updateEntry] = useMutation(UPDATE_ENTRY);

const entry = useReactiveVar(currentEntryVar)
const changedHeader = useReactiveVar(changedHeaderVar);
const changedContent = useReactiveVar(changedContentVar);
const changedDates = useReactiveVar(changedDatesVar);
const changedIndexes = useReactiveVar(changedIndexesVar);


if (!entry)
  return <Box>No entry found</Box>

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

  currentEntryVar({
    ...entry,
    header: header,
    content: content,
    dates: dates,
    indexes: indexes
  })
}

const doReset = () => {
  changedHeaderVar(undefined);
  changedContentVar(undefined);
  changedDatesVar(undefined);
  changedIndexesVar(undefined);
}

return <Box p={4} d={"flex"} border={"3px solid gray"} key={entry.book + entry.header}>
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
      </ButtonGroup>
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
