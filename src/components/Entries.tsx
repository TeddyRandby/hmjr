import React from "react"
import {useQuery, useReactiveVar} from "@apollo/client"
import {GET_ENTRIES_BY_BOOK} from "../queries/Entries"
import {bookNumberVar, entryIndexVar} from "../cache"
import {Entry} from "./Entry"

export const Entries = () => {

  const book = useReactiveVar(bookNumberVar);
  const entryIndex = useReactiveVar(entryIndexVar);

  const {data, loading, error } = 
  useQuery(GET_ENTRIES_BY_BOOK,{ 
    variables: {
    "bookNumber": book
    }
  });


  if (error || loading)
    return <div>loading or error </div>

  let entries = data.entriesByBook.slice().sort((a:any,b:any)=>{
    if (a.header < b.header) {
      return -1;
    }
    if (a.header > b.header) {
      return 1;
    }
    return 0;
  })


  return <Entry entry={entries[entryIndex]}/>
  
}
