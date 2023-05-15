import React, { memo } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { StatusType } from '..';
import { STime } from '../../../assets/styles/app.styles';

interface ITimeDisplayProps {
    time: number;
    status: StatusType;
    progress: number;
}

const TimeDisplay: React.FC<ITimeDisplayProps> = props => {
    const { time, progress } = props;

    const setFormat = (value: number) => {
        return value.toString().padStart(2, '0');
    };

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 60 / 60);
        const minutes = Math.floor(time / 60) % 60;
        const seconds = time % 60;
        return `${setFormat(hours)}:${setFormat(minutes)}:${setFormat(seconds)}`;
    };

    return (
        <div>
            <STime>{formatTime(time)}</STime>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant='determinate' {...props} value={progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant='body2' color='text.secondary'>{`${Math.round(progress)}%`}</Typography>
                </Box>
            </Box>
        </div>
    );
};

export default memo(TimeDisplay);
