import React, {useState, useEffect} from "react"
import {useQuery, useReactiveVar} from "@apollo/client"
import {GET_ENTRIES_BY_BOOK} from "../queries/Entries"
import {bookNumberVar, entryIndexVar, currentEntryVar} from "../cache"
import {Entry} from "./Entry"

export const Entries = () => {

 const book = useReactiveVar(bookNumberVar);
  const entryIndex = useReactiveVar(entryIndexVar);

  const [entries, setEntries] = useState<any[]>([]);

  const {data, loading, error } = 
  useQuery(GET_ENTRIES_BY_BOOK,{ 
    variables: {
    "bookNumber": [book]
    } });


  useEffect(()=>{
    if (data) {
      setEntries(data.entriesByBook.slice().sort((a:any,b:any)=>{
        if (a.header < b.header) {
          return -1;
        }
        if (a.header > b.header) {
          return 1;
        }
        return 0;
      }))
    }
  }, [data])


  if (error || loading)
    return <div>loading or error </div>

  const doDelete = (at: number) => () => {
    const newEntries = entries.slice(); 
    newEntries.splice(at,1);
    setEntries(newEntries);
  }

  const doCreate = (id: string) => {
    const index = entries.length;
    setEntries([...entries, {_id: id, header: "", content: "", book: "", dates: [], indexes: [], locations: [], people: [], organizations: []}]);
    return index;
  }

  const doUpdate = (at: number) => (entry: any) => {
    const newEntries = entries.slice(); 
    newEntries.splice(at,1,entry);
    setEntries(newEntries);
  }

  currentEntryVar(entries[entryIndex])

  return <Entry doDelete={doDelete(entryIndex)}
                doCreate={doCreate}
                doUpdate={doUpdate(entryIndex)}/>
  
}
