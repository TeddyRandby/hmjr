import React from "react"
import {Box, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";

interface DateProps {
  date: any
}
export const Date = (props: DateProps) => {
  const date= props.date;

return <Box p={4} border={"3px solid gray"} key={date.stringified}>
  <FormControl>
    <FormLabel>Day</FormLabel>
    <Input defaultValue={date.day}/>
  </FormControl>
  <FormControl>
    <FormLabel>Month</FormLabel>
  <Input defaultValue={date.month}/>
  </FormControl>
  <FormControl>
    <FormLabel>Year</FormLabel>
  <Input defaultValue={date.year}/>
  </FormControl>
  <FormControl>
    <FormLabel>Stringified</FormLabel>
  <Input defaultValue={date.stringified}/>
  </FormControl>
  <FormControl>
    <FormLabel>Content</FormLabel>
  <Textarea defaultValue={date.content}/>
  </FormControl>
</Box>

}
