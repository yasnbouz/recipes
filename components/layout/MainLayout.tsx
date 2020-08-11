import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';
import GlobalStyle from 'utils/globalStyle';
import Head from 'next/head';
import { Layout } from 'antd';
import MainFooter from './MainFooter';
import styled from 'styled-components';
import MainNavBar from './MainNavBar';
const { Content } = Layout;
type Props = {
    children: ReactNode;
    title?: string;
};
const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
const MainHead = ({ title }: { title: string }) => (
    <Head>
        {/* <!-- Primary Meta Tags --> */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={title} />
        <meta name="description" content="A recipe discovery app powerd by Nextjs" />
        <meta name="keywords" content="React, Nextjs, typescript, Graphql, GraphCMS" />
        <meta name="author" content="@yasnbouz" />
        <title>{title}</title>

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://recipes.yasnbouzi.vercel.app/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="A recipe discovery app powerd by Nextjs" />
        <meta property="og:image" content="/logo.svg" />

        {/* <!-- Twitter --/> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://recipes.yasnbouzi.vercel.app/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content="A recipe discovery app powerd by Nextjs" />
        <meta property="twitter:image" content="/logo.svg" />

        {/* tab icon */}
        <link href="/icons/favicon.ico" rel="icon" type="image/x-icon" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link href="/icons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/manifest.json" rel="manifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
    </Head>
);
const MainLayout = ({ children, title = '' }: Props) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainHead title={title} />
            <StyledBody>
                <Layout>
                    <MainNavBar />
                    <Content> {children}</Content>
                    <MainFooter />
                </Layout>
            </StyledBody>
        </ThemeProvider>
    );
};

export default MainLayout;
