import React from 'react';
import Timer from './components/Timer/index';
import { SApp } from './assets/styles/app.styles';
import styled from 'styled-components';
import Countdown from './components/Countdown';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
    const theme = createTheme({
        palette: {
            primary: { main: '#344E41' },
        },
    });
    return (
        <SApp>
            <Container>
                <ThemeProvider theme={theme}>
                    <Timer />
                    <Countdown />
                </ThemeProvider>
            </Container>
        </SApp>
    );
}

export default App;

const Container = styled.div`
    margin: 5vh 30vw 0 30vw;
`;
