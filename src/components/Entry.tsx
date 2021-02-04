import React from "react"
import {Date} from "./Date"
import {Box, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";

interface EntryProps {
  entry: any
}
export const Entry = (props: EntryProps) => {
  const entry = props.entry;

if (!entry)
  return <Box>No entry found</Box>

return <Box p={4} border={"3px solid gray"} key={entry.book + entry.header}>
  <FormControl>
    <FormLabel>Header</FormLabel>
    <Input defaultValue={entry.header}/>
  </FormControl>
  <FormControl>
    <FormLabel>Book</FormLabel>
  <Input defaultValue={entry.book}/>
  </FormControl>
  <FormControl>
    <FormLabel>Content</FormLabel>
  <Textarea defaultValue={entry.content}/>
  </FormControl>
  {entry.dates.map((date:any)=><Date date={date}/>)}
</Box>

}
