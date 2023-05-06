import React from 'react';
import Timer from './components/Timer/index';
import { SApp } from './assets/styles/app.styles';
import styled from 'styled-components';

const Container = styled.div`
margin: 20vh 30vw;
padding: 20px;
background-color: #A3B18A;
border-radius: 5px
`

function App() {
    return (
        <SApp>
            <Container>
                <Timer />
            </Container>
        </SApp>
    );
}

export default App;
