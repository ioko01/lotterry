// import App from "next/app";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import type { AppProps /*, AppContext */ } from "next/app";
import { useEffect } from "react";
import { themePrimary } from "../../styles/style";
import { client } from "../lib/client";
import { wrapper } from "../redux/strore";
import AuthContextProvider from "../context/authContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ApolloProvider client={client}>
            <AuthContextProvider>
                <ThemeProvider theme={themePrimary}>
                    <CssBaseline>
                        <Component {...pageProps} />
                    </CssBaseline>
                </ThemeProvider>
            </AuthContextProvider>
        </ApolloProvider>
    );
}

export default wrapper.withRedux(MyApp);
