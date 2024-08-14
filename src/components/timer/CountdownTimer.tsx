import React, { useEffect, useState } from "react";
import HistoryIcon from '@mui/icons-material/History';
interface Props {
    countdown: number;
}

const CountdownTimer: React.FC<Props> = ({ countdown }) => {
    const [counter, setCounter] = useState(countdown);

    useEffect(() => {
        const timer: NodeJS.Timeout | undefined =
            counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : undefined;
        return () => clearInterval(timer);
    }, [counter]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <>

            {counter > 0 ? (
                <div style={{
                    position: 'fixed',
                    top: '95%',
                    right: '0',
                    transform: 'translateY(-50%)',
                    backgroundColor: "#516d87",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: "25px",
                    textAlign: "center",
                    zIndex: 1000, // Ensure it's on top of other content
                    display: 'flex', // Use Flexbox for alignment
                    alignItems: 'center', // Align items vertically
                }}>
                    <HistoryIcon style={{ marginRight: '5px' }} /> {/* Add space between icon and text */}
                    <p>{formatTime(counter)}</p>
                </div>
                
            ) : (
                <div style={{
                    position: 'fixed',
                    top: '95%',
                    right: '0',
                    transform: 'translateY(-50%)',
                    backgroundColor: "red",
                    color: "white",
                    padding: "12px",
                    borderRadius: "25px",
                    textAlign: "center",
                    zIndex: 1000 // Ensure it's on top of other content
                }}>
                    <p>Session Expired</p>
                </div>
            )}
        </>
    );
};

export default CountdownTimer;
