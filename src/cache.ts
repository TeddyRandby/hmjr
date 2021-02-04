import {InMemoryCache, makeVar} from "@apollo/client"

export const bookNumberVar = makeVar("");
export const entriesVar = makeVar([]);
export const entryIndexVar = makeVar(0);

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
        entryILndex: {
          read() {
            return entryIndexVar();
          }
        }
      }
    }
  }
})
