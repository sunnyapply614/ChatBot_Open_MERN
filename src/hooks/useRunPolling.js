import {useEffect, useRef} from 'react';
import {fetchRun} from "../services/api";
import {runFinishedStates} from "../hooks/constants";

export const useRunPolling = (threadId, run, setRun) => {
    const pollingTimerRef = useRef(null);

    

    const stopPolling = () => clearInterval(pollingTimerRef.current);

    useEffect(() => {
        const needsToPoll = run && !runFinishedStates.includes(run.status);

        if (needsToPoll) {
            startPolling();
        } else {
            stopPolling();
        }

        return stopPolling;
    }, [threadId, run, setRun, runFinishedStates]);
};
