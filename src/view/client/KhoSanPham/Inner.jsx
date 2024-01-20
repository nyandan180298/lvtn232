import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Table from 'components/Table/Table';
import moment from 'moment';
import { memo, useMemo } from 'react';

const Inner = memo(({ data }) => {
    const formatNgayNhapHang = (_, text) => {
        return (
            <p>
                {text.createdAt &&
                    moment(text.createdAt.substring(0, 10)).format(
                        'DD/MM/YYYY'
                    )}
            </p>
        );
    };
    const setKey = (text) => {
        return text.uid;
    };

    const editInfoFormat = (_, text) => {
        return (
            <Button className="edit-button" onClick={() => {}}>
                <EditOutlined style={{ color: 'red' }} />
            </Button>
        );
    };

    const columns = useMemo(
        () => [
            {
                title: 'Mã sản phẩm',
                dataIndex: 'maSP',
                key: 'maSP',
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'tenSP',
                key: 'tenSP',
            },
            {
                title: 'Giá nhập',
                dataIndex: 'giaNhap',
                key: 'giaNhap',
            },
            {
                title: 'Số lượng',
                dataIndex: 'sLuong',
                key: 'sLuong',
            },
            {
                title: 'Nguồn nhập',
                dataIndex: 'nguon',
                key: 'nguon',
            },
            {
                title: 'Ngày nhập kho',
                dataIndex: 'ngayNhap',
                key: 'ngayNhap',
                render: formatNgayNhapHang,
            },
            {
                title: '',
                dataIndex: '',
                key: 'action',
                render: editInfoFormat,
            },
        ],
        []
    );

    return (
        <div className="table-container">
            <div>
                <div className="search-add">
                    <Button className="add-patient-button" onClick={() => {}}>
                        {/* <Add />
                        Thêm bệnh nhân */}
                    </Button>
                </div>
                <Table
                    className="item-list"
                    columns={columns}
                    data={''}
                    rowKey={setKey}
                />
            </div>
            {/* <Pagination
                title={'Bệnh nhân'}
                pageSize={data && data.pageSize}
                totalRow={data && data.totalRows}
                currentPage={data && data.currentPage}
                totalPage={data && data.totalPages}
                onPaginate={onPaginate}
            /> */}
        </div>
    );
});

export default Inner;
