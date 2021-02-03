import * as React from "react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { ApolloClient, ApolloProvider } from "@apollo/client"
import {BookCounter} from "./components/BookCounter"
import {Entries} from "./components/Entries"
import {cache} from "./cache"

const client = new ApolloClient({
  uri: "https://hmjrapi-prod.herokuapp.com/",
  cache: cache
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <BookCounter/>
      <Entries/>
    </ApolloProvider>
  </ChakraProvider>
)
