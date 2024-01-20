import { FC, memo } from 'react';
import { Table as AntTable } from 'antd';

interface IColumnProps {
    title?: string;
    dataKey: string;
    key: string;
    sortable?: boolean;
}

interface IDataProps {
    [key: string]: any;
}

interface ITableProps {
    columns: Array<IColumnProps>;
    data: Array<IDataProps>;
    rowKey: string;
}

const Table: FC<ITableProps> = memo(({ columns, data, rowKey }) => {
    return data ? (
        <AntTable
            columns={columns}
            dataSource={data}
            rowKey={rowKey}
            pagination={false}
        />
    ) : (
        <AntTable columns={columns} />
    );
});

export default Table;
