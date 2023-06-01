import React, { useState, useEffect, useRef } from 'react';

export function useInterval(callback: () => any, delay: number) {
    const savedCallback: React.MutableRefObject<(() => any) | undefined> = useRef<(() => any)>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current && savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}