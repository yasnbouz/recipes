import 'antd/dist/antd.css';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { ApolloProvider } from '@apollo/react-hooks';
import { AnimatePresence, motion } from 'framer-motion';

import { UserContext, useFetchUser } from 'lib/user';

import { useApollo } from '../lib/apolloClient';
function handleExitComplete() {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0 });
    }
}
export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const userHook = useFetchUser();
    const apolloClient = useApollo(pageProps.initialApolloState);
    return (
        <UserContext.Provider value={userHook}>
            <ApolloProvider client={apolloClient}>
                <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={router.route}>
                        <Component {...pageProps} />
                    </motion.div>
                </AnimatePresence>
            </ApolloProvider>
        </UserContext.Provider>
    );
}
