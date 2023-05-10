import React, { memo, useCallback, useState } from 'react';
import { Button } from '@mui/material';
import Time from './components/Time';
import { SHeading } from '../../assets/styles/app.styles';
import { STimer } from '../../assets/styles/Timer';

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
        <STimer>
            <SHeading>Timer</SHeading>
            <Time status={timerState.status} />
            <Button onClick={changeAction} color='inherit' variant='contained'>
                {timerState.action}
            </Button>
            <Button onClick={reset} color='inherit' variant='contained' disabled={isResetButtonDisabled}>
                Сбросить
            </Button>
        </STimer>
    );
};

export default memo(Timer);
