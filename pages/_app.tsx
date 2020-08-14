import 'antd/dist/antd.css';

import { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/react-hooks';

import { UserContext, useFetchUser } from 'lib/user';

import { useApollo } from '../lib/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
    const userHook = useFetchUser();
    const apolloClient = useApollo(pageProps.initialApolloState);
    return (
        <UserContext.Provider value={userHook}>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </UserContext.Provider>
    );
}
