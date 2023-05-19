import React, { memo, useCallback, useMemo, useState } from 'react';
import { SInput, STimeInputsWrapper, SInputContainer } from '../../../assets/styles/Countdown';
import { Slider } from '@mui/material';
import { StatusType } from '..';

interface ITimeInputProps {
    status: StatusType;
    setTime: (value: number) => void;
    setMaxValue: (value: number) => void;
}

const TimeInput: React.FC<ITimeInputProps> = props => {
    const { status, setTime, setMaxValue } = props;

    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [slider, setSlider] = useState<number | number[]>(0);

    const formatValue = (value: number) => {
        return value.toString().padStart(2, '0');
    };

    const handleMinutesChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const minutes = Number(e.currentTarget.value);
            setMinutes(minutes);
            setSlider(minutes * 60);
            setTime(minutes * 60 + seconds);
            setMaxValue(minutes * 60 + seconds);
        },
        [seconds, setMaxValue, setTime]
    );

    const handleSecondsChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const seconds = Number(e.currentTarget.value);
            setSeconds(seconds);
            setTime(minutes * 60 + seconds);
            setMaxValue(minutes * 60 + seconds);
        },
        [minutes, setMaxValue, setTime]
    );

    const handleSliderChange = useCallback(
        (e: Event, value: number | number[]) => {
            setSlider(Number(value));
            setMinutes(Math.floor(Number(value) / 60));
            setSeconds((Number(value) as number) % 60);
            setTime(minutes * 60 + seconds);
            setMaxValue(minutes * 60 + seconds);
        },
        [minutes, seconds, setMaxValue, setTime]
    );

    useMemo(() => {
        if (seconds > 59) {
            setMinutes(prev => prev + 1);
            setSeconds(0);
        }
        if (seconds < 0) {
            setMinutes(prev => prev - 1);
            setSeconds(59);
        }
        if (minutes < 0) {
            setMinutes(0);
        }
        if (minutes > 720) {
            setMinutes(720);
            setTime(720 * 60 + seconds);
            setMaxValue(minutes * 60 + seconds);
        }
        setSlider(minutes * 60 + seconds);
    }, [seconds, minutes, setTime, setMaxValue]);

    const isControlsDisabled = status === 'running' || status === 'paused';

    return (
        <>
            <STimeInputsWrapper>
                <SInputContainer>
                    <span>Минуты:</span>
                    <SInput
                        value={formatValue(minutes)}
                        size={2}
                        type='number'
                        placeholder='Минуты'
                        onChange={handleMinutesChange}
                        disabled={isControlsDisabled}
                    />
                </SInputContainer>
                <SInputContainer>
                    <span>Секунды:</span>
                    <SInput
                        value={formatValue(seconds)}
                        size={1}
                        type='number'
                        placeholder='Секунды'
                        onChange={handleSecondsChange}
                        disabled={isControlsDisabled}
                    />
                </SInputContainer>
            </STimeInputsWrapper>
            <Slider
                value={slider}
                onChange={handleSliderChange}
                valueLabelDisplay='auto'
                step={15}
                max={3600}
                marks={marks}
                color='primary'
                disabled={isControlsDisabled}
                valueLabelFormat={value => String(value) + 's'}
            />
        </>
    );
};

export default memo(TimeInput);

const marks = [
    { value: 0, label: 'm' },
    { value: 600, label: '10' },
    { value: 1200, label: '20' },
    { value: 1800, label: '30' },
    { value: 2400, label: '40' },
    { value: 3000, label: '50' },
    { value: 3600, label: '60' },
];
