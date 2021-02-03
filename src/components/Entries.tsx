import React from "react"
import {useQuery, useReactiveVar} from "@apollo/client"
import {GET_ENTRIES_BY_BOOK} from "../queries/Entries"
import {bookNumberVar} from "../cache"

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

  return <div>{data?.entriesByBook.map((entry:any, index: number)=><div key={index + entry.header}>{entry.book} : {entry.header}</div>)}</div>
}
