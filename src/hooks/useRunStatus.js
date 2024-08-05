import {useState, useEffect} from 'react';
import {runFinishedStates} from "../hooks/constants";

export const useRunStatus = (run) => {


    useEffect(() => {
        if (run?.status === "in_progress") {
            setStatus("Thinking ...");
        } else if (run?.status === "queued") {
            setStatus("Queued ...");
        } else {
            setStatus(undefined);
        }
    }, [run]);

    useEffect(() => {
        setProcessing(!runFinishedStates.includes(run?.status ?? "completed"));
    }, [run]);

    return {status, processing};
};
