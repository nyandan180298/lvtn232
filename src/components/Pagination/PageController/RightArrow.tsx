import { FC, useCallback } from 'react';
import { arrowStateConst } from '.';

export interface IRightArrowProps {
    currentPage?: number;
    arrowState?: string;
    onPaginate?: (page: number) => void;
}

export const RightArrow: FC<IRightArrowProps> = ({
    currentPage,
    arrowState,
    onPaginate,
}) => {
    const handleArrowClick = useCallback(() => {
        if (arrowState === arrowStateConst.UNAVAILABLE) return;

        const prevPageNo = currentPage && currentPage + 1;
        prevPageNo && onPaginate && onPaginate(prevPageNo);
    }, [arrowState, onPaginate, currentPage]);

    return (
        <div className={'arrow' + arrowState} onClick={handleArrowClick}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6 13L11 8L6 3" strokeLinejoin="round" />
            </svg>
        </div>
    );
};
