import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ActionType } from '..';

interface ITimeProps {
    action: ActionType;
}

const Time: React.FC<ITimeProps> = props => {
    const { action } = props;
    const [time, setTime] = useState<number>(0);

    const start = () => {
        const interval = setInterval(() => setTime(prev => prev + 1), 10);
        return () => clearInterval(interval);
    };

    useEffect(() => {
        switch (action) {
            case 'Запустить':
                return setTime(0);
            case 'Пауза':
                return start();
        }
    }, [action]);

    const formatTime = useCallback((time: number) => {
        const minutes = Math.floor(time / 6000);
        const seconds = Math.floor((time % 6000) / 100);
        const milliseconds = Math.floor(time % 100);
        const setFormat = (value: number) => {
            return value.toString().padStart(2, '0')
        }

        return `${setFormat(minutes)}:${setFormat(seconds)}.${setFormat(milliseconds)}`;
    }, []);

    return <TimeContainer>{formatTime(time)}</TimeContainer>;
};

export default memo(Time);

const TimeContainer = styled.div`
    font-family: 'Orbitron', sans-serif;
    color: #344e41;
    display: flex;
    padding: 10px;
    font-size: 50px;
    border-radius: 5px;
    background-color: #dad7cd;
`;
