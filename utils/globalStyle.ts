import { createGlobalStyle } from 'styled-components';
const heading = (size) => `
    text-align:center;
    font-weight:bold;
    line-height:1em;
    font-size:${size};
`;

const GlobalStyle = createGlobalStyle`
    ${({ theme }) => `
        h1{${heading(theme.font_size_xl)}}
        h2{${heading(theme.font_size_lg)}}
        h3{${heading(theme.font_size_md)}}
        h4{${heading(theme.font_size_sm)}}
        h5{${heading(theme.font_size_xm)}}
    `}
    img{
        max-width:100%;
        width:100%;
    }
`;

export default GlobalStyle;
