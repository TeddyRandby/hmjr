import React from "react"
import {Box, Button, ButtonGroup, Input } from "@chakra-ui/react"
import {UseBookCounter} from "../hooks/UseBookCounter"
import {bookNumberVar} from "../cache";

export const BookCounter = () => {

  const [book, increment, decrement] = UseBookCounter();

  bookNumberVar(book);

  return <Box p={4}>
    <ButtonGroup>
      <Button colorScheme="red" onClick={()=>decrement(100)}>-100</Button>
      <Button colorScheme="red" onClick={()=>decrement(10)}>-10</Button>
      <Button colorScheme="red" onClick={()=>decrement(1)}>-1</Button>
      <Button colorScheme="gray" disabled>{book}</Button>
      <Button colorScheme="blue" onClick={()=>increment(1)}>+1</Button>
      <Button colorScheme="blue" onClick={()=>increment(10)}>+10</Button>
      <Button colorScheme="blue" onClick={()=>increment(100)}>+100</Button>
    </ButtonGroup>
  </Box>
}
