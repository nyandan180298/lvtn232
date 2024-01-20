import { useRef, useCallback, useEffect } from 'react';

const useAbortController = () => {
    const abortControllerRef = useRef(new AbortController());
    const getAbortController = useCallback(() => {
        if (!abortControllerRef.current) {
            abortControllerRef.current = new AbortController();
        }
        return abortControllerRef.current;
    }, []);

    useEffect(() => {
        return () => getAbortController().abort();
    }, [getAbortController]);

    const getSignal = useCallback(
        () => getAbortController().signal,
        [getAbortController]
    );

    return {
        getAbortController,
        getSignal,
    };
};

export default useAbortController;
