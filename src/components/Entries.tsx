import React from "react"
import {useQuery} from "@apollo/client"
import {GET_ENTRIES_BY_BOOK} from "../queries/Entries"

export const Entries = () => {

  const {data, loading, error } = useQuery(GET_ENTRIES_BY_BOOK);

  if (error || loading)
    return <div>loading or error </div>

  return <div>{data?.entriesByBook.map((entry:any, index: number)=><div key={index + entry.header}>{entry.book} : {entry.header}</div>)}</div>
}
