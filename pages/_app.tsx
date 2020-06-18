import App from 'next/app';
import 'antd/dist/antd.css';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return <Component {...pageProps} />;
    }
}
