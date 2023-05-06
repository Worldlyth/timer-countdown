import React, { memo, useCallback, useState } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Time from './components/Time';

interface IindexProps {}

export type ActionType = 'Запустить' | 'Пауза' | 'Возобновить';

const Timer: React.FC<IindexProps> = props => {
    const [action, setAction] = useState<ActionType>('Запустить');

    const changeAction = useCallback(() => {
        switch (action) {
            case 'Запустить':
                return setAction('Пауза');
            case 'Пауза':
                return setAction('Возобновить');
            case 'Возобновить':
                return setAction('Пауза');
        }
    }, [action]);

    const reset = () => {
        setAction('Запустить');
    };

    return (
        <TimerContainer>
            <Heading>Timer</Heading>
            <Time action={action} />
            <Button onClick={changeAction} color='inherit' variant='contained'>
                {action}
            </Button>
            <Button onClick={reset} color='inherit' variant='contained' disabled={action === 'Запустить'}>
                Сбросить
            </Button>
        </TimerContainer>
    );
};

export default memo(Timer);

const TimerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Heading = styled.div`
    color: #344e41;
    font-family: 'Orbitron', sans-serif;
    font-size: 60px;
    text-align: left;
`;
