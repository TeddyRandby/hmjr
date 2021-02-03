import React from "react"
import {Box, Button, ButtonGroup} from "@chakra-ui/react"
import {UseBookCounter} from "../hooks/UseBookCounter"
import {bookNumberVar} from "../cache";

export const BookCounter = () => {

  const [book, increment, decrement] = UseBookCounter();

  bookNumberVar(book);

  return <Box p={4} d="flex" alignItems="center"> 
    {book}
    <ButtonGroup>
      <Button colorScheme="blue" onClick={increment}>+</Button>
      <Button colorScheme="red" onClick={decrement}>-</Button>
    </ButtonGroup>
  </Box>
}
