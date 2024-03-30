import { FC, memo } from 'react';
import PageController from './PageController';
import RecordDisplayer from './RecordDisplayer';

interface IPaginationProps {
    title?: string;
    pageSize?: number;
    currentPage?: number;
    totalPage?: number;
    totalRow?: number;
    onPaginate?: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = memo(
    ({ title, pageSize, currentPage, totalPage, totalRow, onPaginate }) => {
        return (
            <div className="pagination-container">
                <RecordDisplayer
                    title={title}
                    totalRow={totalRow}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalPage={totalPage}
                />
                <div className="pagination-space" />
                <PageController
                    currentPage={currentPage}
                    totalPage={totalPage}
                    onPaginate={onPaginate}
                />
            </div>
        );
    }
);
export default Pagination;
