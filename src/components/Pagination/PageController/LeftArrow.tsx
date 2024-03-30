import { FC, useCallback } from 'react';
import { arrowStateConst } from '.';

export interface ILeftArrowProps {
    currentPage?: number;
    arrowState: string;
    onPaginate?: (page: number) => void;
}

export const LeftArrow: FC<ILeftArrowProps> = ({
    currentPage,
    arrowState,
    onPaginate,
}) => {
    const handleArrowClick = useCallback(() => {
        if (arrowState === arrowStateConst.UNAVAILABLE) return;

        const prevPageNo = currentPage && currentPage - 1;
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
                <path d="M10 13L5 8L10 3" strokeLinejoin="round" />
            </svg>
        </div>
    );
};
