import 'antd/dist/antd.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from '../lib/apolloClient';
import { UserContext, useFetchUser } from 'lib/user';
export default function App({ Component, pageProps }) {
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
