import { useState, useEffect, useMemo } from "react"
import { getAllOrder } from "../../Api";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table"
// import ModalProduct from "./ModalProduct";
import { GlobalFilter } from "../ProductManager/globalFilter";
import ModalOrder from "./ModalOrder";

const OrderManager = () => {

    const [order, setOrder] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState('')


    const fetchData = async () => {
        try {
            const res = await getAllOrder();
            setOrder(res.data.reverse())
            console.log(res.data)
            Object.keys(res.data[7]).map((item, index) => {
                console.log(index, item)
            })
        } catch (error) {
            // console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const getStatus = (arr) => {
        if (arr.canceledAt !== null) {
            return (
                <span className='badge badge-danger'>Đã hủy đơn</span>
            )
        }
        if (arr.status.receivedAt === null)
            return (
                <span className=' badge badge-secondary'>Chờ xác nhận</span>
            )
        if (arr.status.deliveryStartedAt === null)
            return (
                <span className=' badge badge-warning'>Đang giao hàng</span>
            )
        if (arr.status.deliveredAt === null)
            return (
                <span className=' badge badge-success'>Đã nhận hàng</span>
            )
    }

    const orderData = useMemo(() => {
        return (
            order && order.map((item, index) => {
                let copy = item
                copy['stt'] = index + 1
                let tempStatus = [
                    { createdAt: copy['status'].createdAt },
                    { deliveredAt: copy['status'].deliveredAt },
                    { deliveryStartedAt: copy['status'].deliveryStartedAt },
                    { receivedAt: copy['status'].receivedAt },
                ]
                return copy
            })
        )
    }
        , [order])
    // productData ? console.log('y', productData) : console.log('x')

    const orderColumns = useMemo(() =>
        (order && order[0]) ?
            [
                {
                    Header: "STT",
                    accessor: 'stt'
                },
                {
                    Header: "Mã đơn hàng",
                    accessor: '_id'
                },
                {
                    Header: "Tên",
                    accessor: 'customerName',
                },
                {
                    Header: "Số điện thoại",
                    accessor: 'customerPhone',
                },
            ]
            : []
        , [order])

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Trạng thái",
                Header: "Trạng thái",
                Cell: ({ row }) => {
                    return (
                        getStatus(row.original)
                    )
                }
            },
            {
                id: "Ngày đặt",
                Header: "Ngày đặt",
                Cell: ({ row }) => {
                    return (
                        <>
                            {(new Date(row.original.createdAt)).getDate() + '-' + (Number((new Date(row.original.createdAt)).getMonth()) + 1)
                                + '-' + (new Date(row.original.createdAt)).getFullYear()}
                        </>
                    )

                }
            },
            {
                id: "Edit",
                Header: "",
                Cell: ({ row }) => {
                    return (
                        <>
                            <button className="btn-success rounded m-2" onClick={() => handleEditOrder(row)}
                            >
                                <i className="fas fa-edit" style={{ fontWeight: '600', }}></i>
                            </button>
                        </>
                    )

                }
            }
        ]
        )
    }
    const tableIn = useTable(
        { columns: orderColumns, data: orderData, initialState: { pageIndex: 0 } },
        useGlobalFilter,
        tableHooks,
        useSortBy,
        usePagination,

    );
    // console.log(columns)
    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        pageOptions,
        gotoPage,
        pageCount,
        state } = tableIn;

    const { pageIndex, pageSize } = state;
    const toggle = () => setIsOpenModal(!isOpenModal);

    //EDIT
    const handleEditOrder = (row) => {
        setSelectedOrder(row.original)
        setIsOpenModal(true)
    }
    
    return (
        order &&
        <>
            <ModalOrder
                isOpen={isOpenModal}
                toggle={toggle}
                order={selectedOrder}
            />
            <div className="title-container">
                <h5 className="px-3">Quản lý đơn hàng</h5>
                <hr />
            </div>
            <hr style={{ margin: '0' }} />
            <div className="container mt-2">
                <div className="content-container">
                    <div className="mb-3 mt-3 d-flex flex-row align-items-center">
                        <span className="ml-5 mr-1">Tìm kiếm:</span>
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            setGlobalFilter={setGlobalFilter}
                            globalFilter={state.globalFilter}
                        />
                    </div>
                    <table {...getTableProps()} className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            {headerGroups.map((headerGroup) => {
                                return (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => {
                                            return (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render("Header")}
                                                    {column.isSorted ? (column.isSortedDesc ? " ▴" : " ▾") : ""}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell, index) => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <select value={pageSize} className="mr-3 ml-3"
                            onChange={(e) => setPageSize(Number(e.target.value))}>
                            {
                                [5, 10, 20, 50].map((item, index) => {
                                    return (
                                        <option key={index} value={item}>
                                            show {item}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <span className="mr-3 ml-3">
                            Page{' '}
                            <strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                        </span>
                        <span className="mr-3 ml-3">
                            Go to Page: {' '}
                            <input type={'number'}
                                style={{ width: '60px' }}
                                onChange={((e) => {
                                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(pageNumber)
                                })} />
                        </span>
                        <span className="mr-3 ml-3">
                            <button className="btn-dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                            <button className="btn-dark" onClick={previousPage} disabled={!canPreviousPage}>{"<"}</button>
                            <button className="btn-dark" onClick={nextPage} disabled={!canNextPage}>{">"}</button>
                            <button className="btn-dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderManager