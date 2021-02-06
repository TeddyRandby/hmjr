import React from "react"
import {Box, Input, Textarea, FormControl, FormLabel, Button } from "@chakra-ui/react";

interface IndexProps {
  index: any
  at: number
  delete: any
  update: any
}
export const Index = (props: IndexProps) => {
  const index = props.index;

return <Box p={4} border={"3px solid gray"} key={props.at}>
  <FormControl>
    <FormLabel>Book</FormLabel>
    <Input value={index.book} onChange={(event)=>props.update({...index, book:event.target.value})}/>
  </FormControl>
  <FormControl>
    <FormLabel>Page</FormLabel>
    <Input value={index.page} onChange={(event)=>props.update({...index, page:event.target.value})}/>
  </FormControl>
  <FormControl>
    <FormLabel>Content</FormLabel>
    <Textarea value={index.content} onChange={(event)=>props.update({...index, content:event.target.value})}/>
  </FormControl>
  <FormControl>
    <Button onClick={props.delete}>remove</Button>
  </FormControl>
</Box>

}
