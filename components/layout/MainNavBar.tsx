import Link from 'next/link';

import styled from 'styled-components';

import { AlignRightOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { useUser } from 'lib/user';

const { Header } = Layout;

const StyledHeader = styled(Header)`
    ${({ theme }) => `
        background-color:${theme['header_color']};
        border-bottom:1px solid ${theme['header_color']};
        display: flex;
        justify-content: space-between;
        align-items:center;
        li a {
            font-size:${theme['font_size_md']};
        }
    `};
`;
const StyledMenu = styled(Menu)`
    line-height: 62px !important;
    border-bottom: none;
    @media screen and (max-width: 950px) {
        display: flex;
        flex-direction: column;
    }
`;

const StyledBrand = styled.div`
    display: flex;
    align-items: center;
    .logo {
        width: 4em;
        margin-right: 1em;
    }
    .brand-name {
        ${({ theme }) => `
        h1{
            text-align: left;
            font-size:${theme['font_size_lg']};
            line-height:1.2;
        }
        p{
            font-size:${theme['font_size_sm']};
            line-height:0;
        }
        @media screen and (max-width: 510px) {
            h1{
                font-size:${theme['font_size_md']};
            }
            p{
                display:none;
                
            }
    }
        `}
    }
`;

export default function MainNavBar() {
    const { user, loading } = useUser();

    return (
        <StyledHeader>
            <StyledBrand>
                <img className="logo" src="/logo.svg" alt="recipe brand" />
                <div className="brand-name">
                    <h1>Allrecipes</h1>
                    <p>A recipe discovery app powered by Next.js</p>
                </div>
            </StyledBrand>
            <StyledMenu
                triggerSubMenuAction="click"
                mode="horizontal"
                theme="light"
                overflowedIndicator={<AlignRightOutlined style={{ fontSize: '25px' }} />}
            >
                <Menu.Item key="home">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </Menu.Item>
                {user && !loading ? (
                    [
                        <Menu.Item key="my-recipes">
                            <Link href="/my-recipes">
                                <a>My Recipes</a>
                            </Link>
                        </Menu.Item>,
                        <Menu.Item key="favorites">
                            <Link href="/favorites">
                                <a>Favorites</a>
                            </Link>
                        </Menu.Item>,
                        <Menu.Item key="logout">
                            <Link href="/api/logout">
                                <a>Logout</a>
                            </Link>
                        </Menu.Item>,
                    ]
                ) : (
                    <Menu.Item key="login">
                        <Link href="/api/login">
                            <a>Login</a>
                        </Link>
                    </Menu.Item>
                )}
            </StyledMenu>
        </StyledHeader>
    );
}
