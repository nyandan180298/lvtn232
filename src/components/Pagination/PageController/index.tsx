import { FC, memo, useCallback, useEffect, useState } from 'react';
import { LeftArrow } from './LeftArrow';
import { RightArrow } from './RightArrow';

export const arrowStateConst = {
    UNAVAILABLE: 'Unavailable',
    AVAILABLE: 'Available',
};

const ValidPageFirstLetter = new RegExp(`^[1-9][0-9]*$`);
const ValidPage = new RegExp(`^[0-9]*$`);

export interface IPageControllerProps {
    currentPage?: number;
    totalPage?: number;
    onPaginate?: (page: number) => void;
}

const PageController: FC<IPageControllerProps> = memo(
    ({ currentPage, totalPage, onPaginate }) => {
        const [input, setInput] = useState('');
        const [arrowStateLeft, setArrowStateLeft] = useState(
            arrowStateConst.UNAVAILABLE
        );
        const [arrowStateRight, setArrowStateRight] = useState(
            arrowStateConst.UNAVAILABLE
        );

        useEffect(() => {
            if (currentPage?.toString() === '1') {
                setArrowStateLeft(arrowStateConst.UNAVAILABLE);
            } else {
                setArrowStateLeft(arrowStateConst.AVAILABLE);
            }

            if (currentPage === totalPage) {
                setArrowStateRight(arrowStateConst.UNAVAILABLE);
            }

            if (currentPage && totalPage && currentPage < totalPage) {
                setArrowStateRight(arrowStateConst.AVAILABLE);
            }

            currentPage && setInput(currentPage?.toString());
        }, [currentPage, totalPage]);

        const handleKeyDown = useCallback(
            (e: any) => {
                const { key } = e;
                const trimmedInput = input.trim();

                if (key === 'Enter' && trimmedInput.length) {
                    e.preventDefault();
                    if (totalPage && totalPage < parseInt(input)) {
                        onPaginate && onPaginate(totalPage);
                    } else {
                        onPaginate && onPaginate(parseInt(input));
                    }
                    setInput('');
                }
            },
            [input, totalPage, onPaginate]
        );

        const handleKeyChange = useCallback(
            (e: any) => {
                const { value } = e.target;

                if (!input && ValidPageFirstLetter.test(value)) {
                    setInput(value);
                }
                if (input && ValidPage.test(value)) {
                    setInput(value);
                }
            },
            [input]
        );

        return (
            <div className="page-controller">
                <input
                    value={input}
                    type="text"
                    className="pagination-input"
                    onKeyDown={handleKeyDown}
                    onChange={handleKeyChange}
                    placeholder={currentPage?.toString()}
                />
                <div> / {totalPage} trang </div>
                <LeftArrow
                    currentPage={currentPage}
                    arrowState={arrowStateLeft}
                    onPaginate={onPaginate}
                />
                <RightArrow
                    currentPage={currentPage}
                    arrowState={arrowStateRight}
                    onPaginate={onPaginate}
                />
            </div>
        );
    }
);

export default PageController;
