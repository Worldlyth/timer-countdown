import React from 'react';
import Timer from './components/Timer/index';
import { SApp } from './assets/styles/app.styles';
import styled from 'styled-components';
import Countdown from './components/Countdown';

function App() {
    return (
        <SApp>
            <Container>
                <Timer />
                <Countdown />
            </Container>
        </SApp>
    );
}

export default App;

const Container = styled.div`
    margin: 5vh 30vw 0 30vw;
`;
