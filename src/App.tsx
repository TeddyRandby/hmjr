import React from "react"
import { ChakraProvider, theme, Center, Box } from "@chakra-ui/react"
import { ApolloClient, ApolloProvider } from "@apollo/client"
import {BookCounter} from "./components/BookCounter"
import {Entries} from "./components/Entries"
import {cache} from "./cache"
import {EntryCounter} from "./components/EntryCounter"

const client = new ApolloClient({
  uri: "https://hmjrapi-prod.herokuapp.com/",
  cache
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <Center>
        <Box>
          <Center>
            <BookCounter/>
          </Center>
          <Center>
            <EntryCounter/>
          </Center>
          <Entries/>
         </Box>
        </Center>
    </ApolloProvider>
  </ChakraProvider>
)
