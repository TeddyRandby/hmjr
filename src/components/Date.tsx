import React from "react"
import {Button, Box, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";

interface DateProps {
  date: any
  at: number
  delete: any
  update: any
}

export const Date = (props: DateProps) => {
  const date= props.date;

return <Box p={4} border={"3px solid gray"} key={props.at}>
  <FormControl>
    <FormLabel>Month</FormLabel>
    <Input value={date.month} onChange={(event)=>props.update({...date, month: event.target.value})}/>
  </FormControl>
  <FormControl>
    <FormLabel>Day</FormLabel>
    <Input type="number" value={date.day} onChange={(event)=>props.update({...date, day: event.target.value})}/>
  </FormControl>
  <FormControl>
    <FormLabel>Year</FormLabel>
    <Input value={date.year} onChange={(event)=>props.update({...date, year: event.target.value})}/>
  </FormControl>
  <FormControl>
    <FormLabel>Stringified</FormLabel>
    <Input value={date.stringified} onChange={(event)=>props.update({...date, stringified: event.target.value})}/>
  </FormControl>
  <FormControl>
    <FormLabel>Content</FormLabel>
    <Textarea value={date.content} onChange={(event)=>props.update({...date, content: event.target.value})}/>
  </FormControl>
  <FormControl>
    <Button onClick={props.delete}>remove</Button>
  </FormControl>
</Box>

}
