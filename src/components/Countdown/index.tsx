import React, { memo } from 'react';
import TimeInput from './components/TimeInput';
import { SHeading } from '../../assets/styles/app.styles';
import { SCountdown } from '../../assets/styles/Countdown';

interface ICountdownProps {}

const Countdown: React.FC<ICountdownProps> = props => {
    return (
        <SCountdown>
            <SHeading>Countdown</SHeading>
            <TimeInput />
        </SCountdown>
    );
};

export default memo(Countdown);
