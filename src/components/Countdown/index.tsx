import React, { memo, useCallback, useEffect, useState } from 'react';
import TimeInput from './components/TimeInput';
import { SHeading } from '../../assets/styles/app.styles';
import { SCountdown } from '../../assets/styles/Countdown';
import TimeDisplay from './components/TimeDisplay';
import { Button } from '@mui/material';

interface ICountdownProps {}

export type StatusType = 'initial' | 'running' | 'paused';
type ActionType = 'Запустить' | 'Пауза' | 'Возобновить' | 'Сбросить';

export interface ICountdownState {
    status: StatusType;
    action: ActionType;
}

const Countdown: React.FC<ICountdownProps> = props => {
    const [time, setTime] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(0);
    const [countdownState, setCountdownState] = useState<ICountdownState>({
        status: 'initial',
        action: 'Запустить',
    });

    const isResetDisabled = countdownState.status === 'initial';

    const handleSetMaxValue = (value: number) => {
        setMaxValue(value);
    };

    const handleSetTime = (value: number) => {
        setTime(value);
    };

    const reset = () => {
        setCountdownState({ ...countdownState, action: 'Запустить', status: 'initial' });
        setProgress(0);
        setTime(maxValue);
    };

    const changeAction = useCallback(() => {
        switch (countdownState.action) {
            case 'Запустить':
                return setCountdownState({ ...countdownState, action: 'Пауза', status: 'running' });
            case 'Пауза':
                return setCountdownState({ ...countdownState, action: 'Возобновить', status: 'paused' });
            case 'Возобновить':
                return setCountdownState({ ...countdownState, action: 'Пауза', status: 'running' });
        }
    }, [countdownState]);

    useEffect(() => {
        if (countdownState.status === 'running' && time > 0) {
            const interval = setInterval(() => {
                setTime(() => time - 1);
                setProgress(() => progress + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        if (time === 0 && countdownState.status === 'running') {
            setCountdownState({ ...countdownState, status: 'initial', action: 'Запустить' });
            setProgress(0);
            const alarm = new Audio(
                'https://cdn.videvo.net/videvo_files/audio/premium/audio0063/watermarked/ClockAlarm%20TL02_40_1_preview.mp3'
            );
            alarm.play();
        }
    }, [time, countdownState, setTime, progress]);

    const getPercents = () => {
        const percents = Math.floor((progress / maxValue) * 100);
        if (!percents) return 0;
        if (percents > 100) return 100;
        return percents;
    };

    return (
        <SCountdown>
            <SHeading>Countdown</SHeading>
            <TimeInput setTime={handleSetTime} status={countdownState.status} setMaxValue={handleSetMaxValue} />
            <TimeDisplay time={time} progress={getPercents()} />
            <Button color='inherit' variant='contained' onClick={changeAction}>
                {countdownState.action}
            </Button>
            <Button color='inherit' variant='contained' onClick={reset} disabled={isResetDisabled}>
                Сбросить
            </Button>
        </SCountdown>
    );
};

export default memo(Countdown);
