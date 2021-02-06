import React from "react"
import {Box, Button, ButtonGroup } from "@chakra-ui/react"
import {UseCounter, validateBook} from "../hooks/UseCounter"
import {bookNumberVar} from "../cache";

export const BookCounter = () => {

  const [book, increment, decrement] = UseCounter(1);

  const validated = validateBook(book);

  bookNumberVar(validated);

  return <Box p={4}>
    <ButtonGroup>
      <Button colorScheme="red" onClick={()=>decrement(100)}>-100</Button>
      <Button colorScheme="red" onClick={()=>decrement(10)}>-10</Button>
      <Button colorScheme="red" onClick={()=>decrement(1)}>-1</Button>
      <Button colorScheme="gray" disabled>Volume {book}</Button>
      <Button colorScheme="blue" onClick={()=>increment(1)}>+1</Button>
      <Button colorScheme="blue" onClick={()=>increment(10)}>+10</Button>
      <Button colorScheme="blue" onClick={()=>increment(100)}>+100</Button>
    </ButtonGroup>
  </Box>
}
