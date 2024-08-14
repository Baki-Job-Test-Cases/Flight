import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import Airlines from './Airlines';
import IncludeDelays from './IncludeDelays';
import Sort from './Sort';

export default function ExtraFilters() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const filterRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!filterRef.current || !wrapperRef.current) return;

        //Add margin bottom to the element every time window size change
        const addBottomMargin = () => {
            if (!filterRef.current || !wrapperRef.current) return;

            const { height } = filterRef.current.getBoundingClientRect();

            wrapperRef.current.style.marginBottom = `${height + 20}px`;
        };

        addBottomMargin();

        const throttledAddBottomMargin = throttle(addBottomMargin, 250);

        window.addEventListener('resize', throttledAddBottomMargin);

        return () => window.removeEventListener('resize', throttledAddBottomMargin);
    }, []);

    return (
        <div className="mt-6 flex w-fit gap-6 xl:!mb-0" ref={wrapperRef}>
            <div
                ref={filterRef}
                className="absolute grid w-full grid-cols-1 gap-4 rounded-xl sm:grid-cols-2 xl:right-0 xl:w-72 xl:grid-cols-1"
            >
                <Sort />
                <Airlines />
                <IncludeDelays />
            </div>
        </div>
    );
}
