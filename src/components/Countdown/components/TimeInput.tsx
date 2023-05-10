import React, { useMemo, useState } from 'react';
import { SInput, SInputsWrapper } from '../../../assets/styles/Countdown';
import { createTheme, Slider, ThemeProvider } from '@mui/material';

interface ITimeInputProps {}

interface ITime {
    minutes: number | string;
    seconds: number | string;
}

const TimeInput: React.FC<ITimeInputProps> = props => {
    const [time, setTime] = useState<ITime>({
        minutes: '',
        seconds: '',
    });

    const theme = createTheme({
        palette: {
            primary: { main: '#344E41' },
        },
    });

    const validateMinutes = (value: number | string) => {
        if (value > 720) return setTime({ ...time, minutes: 720 });
        if (value === 0) return setTime({ ...time, minutes: '' });
    };

    const validateSeconds = (value: number | string) => {
        if (value > 3600) return setTime({ ...time, seconds: 3600 });
        if (value === 0) return setTime({ ...time, seconds: '' });
    };

    const setMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime({ ...time, minutes: Number(e.currentTarget.value) });
    };

    const setSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime({ ...time, seconds: Number(e.currentTarget.value) });
    };

    useMemo(() => {
        validateMinutes(time.minutes);
        validateSeconds(time.seconds);
    }, [time]);

    const marks = [
        { value: 0, label: 'min' },
        { value: 600, label: '10' },
        { value: 1200, label: '20' },
        { value: 1800, label: '30' },
        { value: 2400, label: '40' },
        { value: 3000, label: '50' },
        { value: 3600, label: '60' },
    ];

    return (
        <>
            <SInputsWrapper>
                <SInput
                    value={time.minutes}
                    max={720}
                    size={2}
                    onChange={setMinutes}
                    type='number'
                    placeholder='Минуты'
                />
                <SInput value={time.seconds} size={1} onChange={setSeconds} type='number' placeholder='Секунды' />
            </SInputsWrapper>
            <ThemeProvider theme={theme}>
                <Slider
                    name='slider'
                    onChange={(e, value) => setTime({ ...time, seconds: Number(value) })}
                    value={time.seconds as number}
                    valueLabelDisplay='auto'
                    step={15}
                    max={3600}
                    marks={marks}
                    color='primary'
                    onChangeCommitted={(e, value) => {
                        setTime({ ...time, minutes: Math.floor(Number(value) / 60) });
                    }}
                    valueLabelFormat={value => String(value) + 's'}
                />
            </ThemeProvider>
        </>
    );
};

export default TimeInput;
