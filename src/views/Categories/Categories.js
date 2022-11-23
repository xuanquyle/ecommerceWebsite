import { useState, useEffect, useMemo } from "react"
import { getAllCategory, createCategory } from "../../Api";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table"
import { GlobalFilter } from "../ProductManager/globalFilter";
import { useForm } from 'react-hook-form';
import { notify } from '../../ultils/constant';
import { ToastContainer } from 'react-toastify';


const Categories = () => {
    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
    const [arrCate, setArrCate] = useState();
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedCate, setSelectedCate] = useState('')

    const fetchData = async () => {
        try {
            const data = await getAllCategory();
            setArrCate(data.data)
            // console.log('cate',data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {     
        fetchData();
    }, [])
    const cateData = useMemo(() => {
        return (
            arrCate && arrCate.map((item, index) => {
                return item
            })
        )
    }
        , [arrCate])
    // productData ? console.log('y', productData) : console.log('x')

    const cateColumns = useMemo(() =>
        (arrCate && arrCate[0]) ?
            [
                {
                    Header: "Mã danh mục",
                    accessor: Object.keys(arrCate[0])[0]
                },
                {
                    Header: "Tên danh mục",
                    accessor: Object.keys(arrCate[0])[1]
                },
                {
                    Header: "Mô tả",
                    accessor: Object.keys(arrCate[0])[2]
                },
            ]
            : []
        , [arrCate])

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns, {
                id: "Edit",
                Header: "Edit",
                Cell: ({ row }) => {
                    return (
                        <>
                            <button className="btn-success rounded" onClick={() => handleEditCate(row)}>
                                <i className="fas fa-edit" style={{ fontWeight: '600', }}></i>
                            </button>
                            <button className="btn-danger rounded" onClick={() => onDeleteCate(row)}
                                style={{ marginLeft: '10px' }}>
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
        { columns: cateColumns, data: cateData, initialState: { pageIndex: 0 } },
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
    //MODEL ADD
    const handleAddCate = () => {
        setIsEdit(false)
        reset()
        setIsAdd(true)
    }
    //EDIT
    const handleEditCate = (row) => { 
        setIsAdd(false)   
        reset()
        setSelectedCate(row.original)
        setIsEdit(true)
    }
    const onDeleteCate = (row) => {

    }
    const handleSaveCate = async (data) => {
        if (isAdd) {
            try {
                let rep = await createCategory(data)
                notify('success', 'Danh mục "' + data.name + '" đã được thêm !')
                fetchData();
            } catch (error) {
                notify('error', 'Đã có lỗi xảy ra')
            }
        }
        setIsAdd(!isAdd)
        reset()
    }
    const handleCancel = () => {
        reset();
        setIsAdd(false)
        setIsEdit(false)
    }
    return (
        arrCate &&
        <>
            <ToastContainer />
            <div className="title-container">
                <h5 className="px-3">Quản lý danh mục</h5>
                <hr />
            </div>
            <hr style={{ margin: '0' }} />
            <div className="container mt-2">
                {(isAdd || isEdit) && (
                    <div>
                        <form onSubmit={handleSubmit(handleSaveCate)}>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputEmail4">Tên danh mục</label>
                                    <input type="text" className="form-control" id="inputEmail4"
                                    defaultValue={isEdit ? selectedCate.name : ''}
                                        {...register("name", {
                                            required: true,
                                        })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Mô tả</label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder=""
                                    defaultValue={isEdit ? selectedCate.description : ''}
                                        {...register("description", {
                                            // required: true,
                                        })} />
                                </div>
                                <div className="col-md-3 d-flex align-items-end">
                                    <button className="btn btn-primary form-control mb-3 ml-2"
                                        style={{ width: '30%' }}
                                        type="submit">
                                        Lưu
                                    </button>
                                    <button className="btn btn-warning form-control mb-3 ml-3"
                                        style={{ width: '30%', color: '#fff' }}
                                        onClick={handleCancel}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                <div className="content-container">
                    <div className="mb-3 mt-3 d-flex flex-row align-items-center">
                        <button className="btn btn-primary"
                            onClick={handleAddCate}>
                            <i className="fas fa-plus" style={{ fontWeight: '600', marginRight: '5px' }}></i>
                            Thêm danh mục
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
        </>
    )
}

export default Categories