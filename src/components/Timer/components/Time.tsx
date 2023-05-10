import React, { memo, useCallback, useEffect, useState } from 'react';
import { StatusType } from '..';
import { STime } from '../../../assets/styles/app.styles';

interface ITimeProps {
    status: StatusType;
}

const Time: React.FC<ITimeProps> = props => {
    const { status } = props;
    const [time, setTime] = useState<number>(0);
    const start = () => {
        const interval = setInterval(() => setTime(prev => prev + 1), 10);
        return () => clearInterval(interval);
    };
    useEffect(() => {
        switch (status) {
            case 'initial':
                return setTime(0);
            case 'started':
                return start();
        }
    }, [status]);

    const formatTime = useCallback((time: number) => {
        const minutes = Math.floor(time / 6000);
        const seconds = Math.floor((time % 6000) / 100);
        const milliseconds = Math.floor(time % 100);
        const setFormat = (value: number) => {
            return value.toString().padStart(2, '0');
        };

        return `${setFormat(minutes)}:${setFormat(seconds)}.${setFormat(milliseconds)}`;
    }, []);

    return <STime>{formatTime(time)}</STime>;
};

export default memo(Time);
