import { useState, useEffect, useMemo } from "react"
import { getAllProduct } from "../../Api";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table"
// import ModalProduct from "./ModalProduct";
import { GlobalFilter } from "../ProductManager/globalFilter";
import ModalOrder from "./OrderModal";

const OrderManager = () => {
    const data = [
        { id: '637c8748ce9841f2f205c2ef', name: "Xuân Quý", status: 'Chờ xác nhận ', price: '3.500.000', date: '21/11/2022', email: 'xuanquy1214@gmail.com' },
        { id: '637c8748ce9841f2sf05c2kf', name: "Xuân Quý", status: 'Đang giao hàng', price: '54.500.000', date: '15/11/2022', email: 'xuanquy1214@gmail.com' },
        { id: '637c8748ce9841fadf05c2et', name: "Tuyên", status: 'Đã nhận hàng', price: '31.500.000', date: '14/11/2022', email: 'vohaituyen12a7@gmail.com' },
        { id: '637c8748ce9841f2f205c2as', name: "Võ Hải Tuyên", status: 'Đã nhận hàng', price: '47.500.000', date: '14/11/2022', email: 'vohaituyen12a7@gmail.com' },
        { id: '637c8748ád9841f2f205c2ef', name: "Xuân Quý", status: 'Đã xác nhận', price: '3.500.000', date: '21/11/2022', email: 'xuanquy1214@gmail.com' },
        { id: '637c8748ceeff1f2sf05c2kf', name: "Xuân Quý", status: 'Đang giao hàng', price: '54.500.000', date: '15/11/2022', email: 'xuanquy1214@gmail.com' },
        { id: '637c8748ceasajfadf05c2et', name: "Tuyên", status: 'Đã xác nhận', price: '31.500.000', date: '14/11/2022', email: 'vohaituyen12a7@gmail.com' },
        { id: '637c8748cosifpf2f205c2as', name: "Võ Hải Tuyên", status: 'Đã nhận hàng', price: '47.500.000', date: '14/11/2022', email: 'vohaituyen12a7@gmail.com' },
    ]
    const [product, setProduct] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [action, setAction] = useState('create')
    const [selectedProduct, setSelectedProduct] = useState('')
    const [order, setOrder] = useState(data);


    // setOrder(data)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await getAllProduct();
    //             setOrder(data.data)
    //             // console.log(data.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }, [])
    const orderData = useMemo(() => {
        return (
            order && order.map((item, index) => {
                return item
            })
        )
    }
        , [order])
    // productData ? console.log('y', productData) : console.log('x')

    const orderColumns = useMemo(() =>
        (order && order[0]) ?
            [
                {
                    Header: "Họ tên",
                    accessor: Object.keys(order[0])[1]
                },
                {
                    Header: "email",
                    accessor: Object.keys(order[0])[5]
                },
                {
                    Header: "Tổng tiền",
                    accessor: Object.keys(order[0])[3]
                },
                {
                    Header: "Trạng thái",
                    accessor: Object.keys(order[0])[2]
                },
                {
                    Header: "Ngày đặt",
                    accessor: Object.keys(order[0])[4]
                },
            ]
            : []
        , [order])

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns, {
                id: "Edit",
                Header: "Edit",
                Cell: ({ row }) => {
                    return (
                        <>
                            <button className="btn-primary rounded" onClick={() => readProduct(row)}
                                style={{ marginRight: '5px' }}>
                                <i className="fas fa-eye" style={{ fontWeight: '600', }}></i>
                            </button>
                            <button className="btn-success rounded" onClick={() => handleEditProduct(row)}>
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
    //MODEL ADD
    //EDIT
    const handleEditProduct = (row) => {
        setIsOpenModal(true)
        // // console.log('row', row.original);
        // setSelectedProduct(row.original)
        // // setAction('update')
        // setIsOpenModal(true)
    }

    const readProduct = (row) => {
        setSelectedProduct(row.original)
        setAction('read')
        setIsOpenModal(true)
    }
    return (
        order &&
        <>
        <ModalOrder
                        isOpen={isOpenModal}
                        toggle={toggle}
                        order={order[0]}/>
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