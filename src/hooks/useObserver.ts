import {MutableRefObject, useEffect, useRef} from "react";

export const useObserver = (ref: MutableRefObject<HTMLDivElement | null>,
                            canLoad: boolean,
                            isLoading: boolean,
                            callback: () => void) => {
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.5, // Trigger when 50% of the target is visible
        };

        const handleIntersection: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0 && canLoad) {
                    callback();
                }
            });
        };

        observer.current = new IntersectionObserver(handleIntersection, observerOptions);

        if (ref.current) {
            observer.current.observe(ref.current);

            return () => {
                if (observer.current) {
                    observer.current.disconnect();
                }
            };
        }
    }, [ref, canLoad, isLoading, callback]);
}