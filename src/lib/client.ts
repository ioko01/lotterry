import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
    credentials: "include",
    cache: new InMemoryCache(),
});
