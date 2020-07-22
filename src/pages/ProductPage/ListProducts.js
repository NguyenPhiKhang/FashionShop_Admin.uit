import React, { useEffect, useState } from 'react';
import { Table, Radio, Form, Switch, Button, Pagination, Row } from 'antd';
import { RedoOutlined, PlusCircleFilled, EditFilled, DeleteFilled, EyeFilled } from '@ant-design/icons';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { getAllProductQuery, searchProductQuery } from '../../network/queries';
import { useHistory } from 'react-router-dom';
import Search from 'antd/lib/input/Search';
import swal from 'sweetalert';

const columns = [
    {
        title: 'Mã',
        dataIndex: 'product_code',
        key: 'code',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name'
        //sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Giá gốc',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Giảm giá',
        dataIndex: 'promotion_percent',
        key: 'percent',
    },
    {
        title: "Giá cuối cùng",
        dataIndex: "final_price",
        key: 'final_price'
    },
    {
        title: "Số lượng",
        dataIndex: "option_amount",
        key: 'amount',
        render: am => {
            let amount = 0;
            am.map(a => {
                amount += a.amount;
            });
            return <span>{amount}</span>
        },
        sorter: (a, b) => {
            let amounta = 0;
            let amountb = 0;
            a.option_amount.map(am => {
                amounta += am.amount;
            });
            b.option_amount.map(am => {
                amountb += am.amount;
            });

            return amounta - amountb;
        },
        // sortDirections: ['descend'],
    },
    {
        title: "Ảnh đại diện",
        dataIndex: "img_url",
        key: 'img_url',
        render: img => <img style={{ width: 30, height: 40 }} src={`https://fashionshopuit-server.azurewebsites.net/image/${img}`} />
    },
    {
        title: "Danh mục",
        dataIndex: "categories",
        key: 'category',
        render: cats => <span>{cats.category_level1.name}/{cats.category_level2.name}/{cats.category_level3.name}</span>
    },
    {
        title: "Trạng thái",
        dataIndex: "stock_status",
        key: 'stock',
        render: stock => <span>{stock ? "Còn hàng" : "Hết hàng"}</span>
    }
];

const ListProducts = () => {

    // const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(1);
    const [total_record, setTotalRecord] = useState(0);
    const [textSearch, setTextSearch] = useState('');
    const history = useHistory();
    const [data, setDatas] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [allProduct, { loading: LoadingProduct, refetch: refetchAllProduct }] = useLazyQuery(getAllProductQuery, {
        onCompleted: async (datas) => {
            const d = await datas.getProduct.products;
            console.log(d);
            if (total_record !== datas.getProduct.total_record)
                setTotalRecord(datas.getProduct.total_record);
            setDatas(d);
        },
    });

    const [searchProduct, { loading: LoadingSearch, refetch: refetchSearch }] = useLazyQuery(searchProductQuery, {
        onCompleted: async (data) => {
            const d = await data.searchProduct.products;
            if (total_record !== data.searchProduct.total_record)
                setTotalRecord(data.searchProduct.total_record);
            const ds = await [...d];
            setDatas(d);
        }
    });

    const fetchProduct = () => {
        console.log("test");
        if (textSearch === "") {
            allProduct({
                variables: {
                    pageNumber: paging
                }
            });
        }
        else {
            searchProduct({
                variables: {
                    pageNumber: paging,
                    text: textSearch
                }
            })
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [paging, textSearch, data]);

    const onSelectChange = selectedRow => {

        console.log('selectedRowKeys changed: ', selectedRow);
        setSelectedRowKeys(selectedRow);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const searchProducts = text => {
        if (textSearch !== text.trim()) {
            setTextSearch(text.trim());
            setPaging(1);
        };
    }

    const showTotal = total => `Tổng cộng: ${total}`;

    const onChangePage = page => {
        setPaging(page);
    }

    return (
        <div>
            <div style={{ padding: 10, width: '100%', height: 50, backgroundColor: 'white', marginBottom: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Row>
                    <Button style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginRight: 5 }} onClick={() => {
                        refetchAllProduct();
                        history.push("/products/addProduct")
                    }}>
                        <PlusCircleFilled style={{ marginRight: 5 }} />Thêm
                </Button>
                    <Button style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginRight: 5 }} onClick={() => {
                        // history.push("/products/addProduct")
                    }}>
                        <EditFilled style={{ marginRight: 5 }} />Sửa
                </Button>
                    <Button style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginRight: 5 }} onClick={() => {
                        if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1)
                            swal("Vui lòng chọn ít nhất một sản phẩm để xoá", "Nhấn để tiếp tục", "error");
                        else {
                            refetchAllProduct();
                            history.push(`/products/detailProduct/${selectedRowKeys[0]}`);
                        }
                    }}>
                        <DeleteFilled style={{ marginRight: 5 }} />Xoá
                </Button>
                    <Button style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginRight: 5 }} onClick={async () => {
                        if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1)
                            swal("Vui lòng chọn một sản phẩm để xem chi tiết", "Nhấn để tiếp tục", "error");
                        else {
                            await refetchAllProduct();
                            history.push(`/products/detailProduct/${selectedRowKeys[0]}`);
                        }
                    }}>
                        <EyeFilled style={{ marginRight: 5 }} />Xem chi tiết
                </Button>
                </Row>
                <Button style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginRight: 5, }} onClick={() => {
                    refetchAllProduct();
                }}>
                    <RedoOutlined style={{ marginRight: 5 }} />Làm mới
                </Button>
            </div>

            <div style={{ padding: '20px 10px', backgroundColor: '#fff' }}>
                <Search placeholder="Tìm kiếm sản phẩm theo tên" onSearch={searchProducts} enterButton />
                <Table
                    rowSelection={true}
                    columns={columns}
                    loading={LoadingProduct || LoadingSearch}
                    dataSource={data}
                    rowSelection={rowSelection}
                    pagination={false}
                />
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Pagination style={{ marginTop: 15 }} current={paging} total={total_record} showSizeChanger={false} showTotal={showTotal} onChange={onChangePage} />
                </div>
            </div>
        </div>
    );
    // }
}

export default ListProducts;