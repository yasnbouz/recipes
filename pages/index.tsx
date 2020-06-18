import styled from 'styled-components';
import MainLayout from 'components/MainLayout';
const StyledText = styled.h1`
    color: red;
`;

const Home = () => {
    return (
        <MainLayout title="Recipes">
            <StyledText>haha</StyledText>;
        </MainLayout>
    );
};
export default Home;
