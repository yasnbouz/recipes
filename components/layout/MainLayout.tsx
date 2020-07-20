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
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={title} />
        <meta name="description" content="A recipe discovery app powerd by Nextjs" />
        <meta name="keywords" content="React, Nextjs, typescript" />
        <meta name="author" content="@yasnbouz" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://recipe-shop.com" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="A recipe discovery app powerd by Nextjs" />
        <meta property="og:image" content="/logo.svg" />

        {/* <!-- Twitter --/> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://recipe-shop.com" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content="A recipe discovery app powerd by Nextjs" />
        <meta property="twitter:image" content="/logo.svg" />

        {/* tab icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
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
