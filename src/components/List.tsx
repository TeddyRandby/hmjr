import React from "react"
import {Input, InputGroup} from "@chakra-ui/react"

interface ListProps {
  data: string[]
}

export const List = (props: ListProps) => {
  return <div>
    <InputGroup flexDir={"column"}>
      {props.data.map((datum)=><Input value={datum} disabled/>)}
    </InputGroup>
  </div>
}
