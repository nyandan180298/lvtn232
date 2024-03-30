import { FC, memo, useMemo } from 'react';

export interface IRecordDisplayerProps {
    title?: string;
    totalRow?: number;
    pageSize?: number;
    currentPage?: number;
    totalPage?: number;
}

const RecordDisplayer: FC<IRecordDisplayerProps> = memo(
    ({ title, totalRow, pageSize, currentPage, totalPage }) => {
        const fromRecord = useMemo(() => {
            if (!totalRow) {
                return 0;
            }
            return currentPage && pageSize && (currentPage - 1) * pageSize + 1;
        }, [currentPage, pageSize, totalRow]);
        const toRecord = useMemo(
            () =>
                currentPage &&
                pageSize &&
                totalPage &&
                (currentPage === totalPage ? totalRow : currentPage * pageSize),
            [currentPage, pageSize, totalPage, totalRow]
        );

        return (
            <div className="record-displayer">
                <span className="record-displayer-title">
                    {title && title + ': '}
                </span>
                <>
                    {fromRecord} - {toRecord} / {totalRow}
                </>
            </div>
        );
    }
);

export default RecordDisplayer;
