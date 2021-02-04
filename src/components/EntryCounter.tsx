import React from "react"
import {Box, Button, ButtonGroup } from "@chakra-ui/react"
import {UseCounter, validateEntryIndex} from "../hooks/UseCounter"
import {entryIndexVar} from "../cache";

export const EntryCounter = () => {

  const [entry, increment, decrement, set] = UseCounter(0);

  const validated = validateEntryIndex(entry);

  entryIndexVar(validated);

  return <Box p={4}>
    <ButtonGroup>
      <Button colorScheme="red" onClick={()=>decrement(100)}>-100</Button>
      <Button colorScheme="red" onClick={()=>decrement(10)}>-10</Button>
      <Button colorScheme="red" onClick={()=>decrement(1)}>-1</Button>
      <Button colorScheme="gray" disabled>Entry {entry}</Button>
      <Button colorScheme="blue" onClick={()=>increment(1)}>+1</Button>
      <Button colorScheme="blue" onClick={()=>increment(10)}>+10</Button>
      <Button colorScheme="blue" onClick={()=>increment(100)}>+100</Button>
    </ButtonGroup>
  </Box>
}
