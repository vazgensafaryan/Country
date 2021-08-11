import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Countries from "./countries";

function App() {
    const client = new ApolloClient({
        uri: "https://countries.trevorblades.com",
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <Countries />
        </ApolloProvider>
    );
}

export default App;