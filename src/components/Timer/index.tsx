import React, { memo, useCallback, useState } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Time from './components/Time';

interface ITimerProps {}

type ActionType = 'Запустить' | 'Пауза' | 'Возобновить';
export type StatusType = 'initial' | 'started' | 'paused';
interface ITimerState {
    action: ActionType;
    status: StatusType;
}

const Timer: React.FC<ITimerProps> = () => {
    const [timerState, setTimerState] = useState<ITimerState>({
        action: 'Запустить',
        status: 'initial',
    });

    const changeAction = useCallback(() => {
        switch (timerState.action) {
            case 'Запустить':
                return setTimerState({ ...timerState, action: 'Пауза', status: 'started' });
            case 'Пауза':
                return setTimerState({ ...timerState, action: 'Возобновить', status: 'paused' });
            case 'Возобновить':
                return setTimerState({ ...timerState, action: 'Пауза', status: 'started' });
        }
    }, [timerState]);

    const reset = () => {
        setTimerState({ ...timerState, action: 'Запустить', status: 'initial' });
    };

    const isResetButtonDisabled = timerState.status === 'initial';

    return (
        <TimerContainer>
            <Heading>Timer</Heading>
            <Time status={timerState.status} />
            <Button onClick={changeAction} color='inherit' variant='contained'>
                {timerState.action}
            </Button>
            <Button onClick={reset} color='inherit' variant='contained' disabled={isResetButtonDisabled}>
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
