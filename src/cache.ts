import {InMemoryCache, makeVar} from "@apollo/client"

export const bookNumberVar = makeVar("");
export const entriesVar = makeVar([]);
export const entryIndexVar = makeVar(0);

export interface Date {
  day: string 
  month: string 
  year: string 
  content: string
  stringified: string
}

export interface Index {
  book: string
  page: string
  content: string
}

export interface Entry {
  _id: string
  book: string
  header: string
  content: string
  dates: Date[] 
  indexes: Index[]
}

export const currentEntryVar = makeVar<Entry>({
  _id: "",
  header: "",
  content: "",
  book: "",
  dates: [],
  indexes: []
});

export const changedHeaderVar = makeVar<string | undefined>(undefined);
export const changedContentVar = makeVar<string | undefined>(undefined);
export const changedDatesVar = makeVar<Date[] | undefined>(undefined);
export const changedIndexesVar = makeVar<Index[] | undefined>(undefined);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        bookNumber: {
          read() {
            return bookNumberVar();
          }
        },
        entries: {
          read() {
            return entriesVar();
          }
        },
        entryIndex: {
          read() {
            return entryIndexVar();
          }
        },
        currentEntry: {
          read() {
            return currentEntryVar();
          }
        }
      }
    }
  }
})
