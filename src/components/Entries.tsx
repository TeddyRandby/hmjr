import React from "react"
import {useQuery, useReactiveVar} from "@apollo/client"
import {VStack} from "@chakra-ui/react";
import {GET_ENTRIES_BY_BOOK} from "../queries/Entries"
import {bookNumberVar} from "../cache"
import {Entry} from "./Entry"

export const Entries = () => {

  const book = useReactiveVar(bookNumberVar);

  const {data, loading, error } = 
  useQuery(GET_ENTRIES_BY_BOOK,{ 
    variables: {
    "bookNumber": book
    }
  });

  if (error || loading)
    return <div>loading or error </div>

  return<VStack>{data.entriesByBook.map((entry:any)=><Entry entry={entry}/>)}</VStack> 
  
}
