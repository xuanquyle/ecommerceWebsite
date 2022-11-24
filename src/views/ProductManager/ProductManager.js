import { useState, useEffect, useMemo } from "react"
import { getAllProduct, deleteProduct } from "../../Api";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table"
import ModalProduct from "./ModalProduct";
import { GlobalFilter } from "./globalFilter";
import { ToastContainer } from "react-toastify";
import { notify } from '../../ultils/constant';

const ProductManager = (props) => {
    const [product, setProduct] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [action, setAction] = useState('create')
    const [selectedProduct, setSelectedProduct] = useState('')

    const fetchData = async () => {
        try {
            const data = await getAllProduct();
            setProduct(data.data)
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const productData = useMemo(() => {
        return (
            product && product.map((item, index) => {
                let copy = item
                copy['stt'] = index + 1
                // const date = new Date(item['updatedAt'])
                // let temp = new Date(date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()); 
                // console.log('data',temp,'data',date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
                // copy['updatedAt'] = temp.toDateString(); 
                return copy
            })
        )
    }
        , [product])

    const productsColumns2 = useMemo(() =>
        (product && product[0]) ?
            [
                {
                    Header: "STT",
                    accessor: Object.keys(product[0])[12]
                },
                {
                    Header: "Tên sản phẩm",
                    accessor: Object.keys(product[0])[1]
                },
                {
                    Header: "Mô tả",
                    accessor: Object.keys(product[0])[3]
                },
                {
                    Header: "Ngày tạo",
                    accessor: Object.keys(product[0])[8]
                },
            ]
            : []
        , [product])
    // productsColumns2 ? console.log('sss',productsColumns2): console.log('ff')

    // const productsColumns = useMemo(() =>
    //     product && product[0]
    //         ? Object.keys(product[0])
    //             .filter((key) => key !== "_id" && key !== "options" && key !== "category_id" )
    //             .map((key) => {
    //                 //   if (key === "image")
    //                 //     return {
    //                 //       Header: key,
    //                 //       accessor: key,
    //                 //       Cell: ({ value }) => <img src={value} />,
    //                 //       maxWidth: 70,
    //                 //     };
    //                 console.log(key)
    //                 return { Header: key, accessor: key};
    //             })
    //         : [],
    //     [product]
    // );
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns, {
                id: "---",
                Header: "---",
                Cell: ({ row }) => {
                    return (
                        <>
                            <button className="btn-primary rounded m-2" onClick={() => readProduct(row)}
                                // style={{ marginRight: '5px' }}
                                >
                                <i className="fas fa-eye" style={{ fontWeight: '600', }}></i>
                            </button>
                            <button className="btn-success rounded m-2" onClick={() => handleEditProduct(row)}
                                // style={{ marginRight: '5px' }}
                                >
                                <i className="fas fa-edit" style={{ fontWeight: '600', }}></i>
                            </button>
                            <button className="btn-danger rounded m-2" onClick={() => handleDeleteProduct(row)}>
                                <i className="fas fa-trash" style={{ fontWeight: '600', }}></i>
                            </button>
                        </>
                    )

                }
            }
        ]
        )
    }
    const tableIn = useTable(
        { columns: productsColumns2, data: productData, initialState: { pageIndex: 0 } },
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
    const handleAddProduct = () => {
        setAction('create')
        setIsOpenModal(true)
    }
    //EDIT
    const handleEditProduct = (row) => {
        // console.log('row', row.original);
        setSelectedProduct(row.original)
        setAction('update')
        setIsOpenModal(true)
    }
    // DELETE
    const handleDeleteProduct = async (row) => {
        if (window.confirm('Bạn có chắc xóa sản phẩm này ?')) {
            try {
                const rep = await deleteProduct(row.original._id);
                // getProfile();
                notify('success', 'Sản phẩm đã được xóa')
                fetchData();
            } catch (error) {

            }
        }
    }
    const readProduct = (row) => {
        setSelectedProduct(row.original)
        setAction('read')
        setIsOpenModal(true)
    }

    return (
        <>
            <ToastContainer 
            theme="colored"/>
            {product ? (
                <div>
                    <ModalProduct
                        isOpen={isOpenModal}
                        toggle={toggle}
                        product={selectedProduct}
                        action={action}
                        updateData={fetchData} />

                    <div className="title-container">
                        <h5 className="px-3">Quản lý sản phẩm</h5>
                        <hr />
                    </div>
                    <hr style={{ margin: '0' }} />
                    <div className="container mt-2">
                        <div className="content-container">
                            <div className="mb-3 mt-3 d-flex flex-row align-items-center">
                                <button className="btn btn-primary"
                                    onClick={handleAddProduct}>
                                    <i className="fas fa-plus" style={{ fontWeight: '600', marginRight: '5px' }}></i>
                                    Thêm sản phẩm
                                </button>
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
                </div>) : (<div>Loading...</div>)}
        </>
    )
}

export default ProductManager