import styled from 'styled-components';
import MainLayout from 'components/layout/MainLayout';
const StyledText = styled.h1`
    color: red;
`;

const Home = () => {
    return (
        <MainLayout title="Recipes">
            <StyledText>hello</StyledText>;
        </MainLayout>
    );
};
export default Home;
