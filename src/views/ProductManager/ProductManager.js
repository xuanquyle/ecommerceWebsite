import { useState, useEffect, useMemo } from "react"
import { getAllProduct } from "../../Api";
import { useTable } from "react-table"
// import tw from "twin.macro"

const ProductManager = (props) => {
    const [product, setProduct] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProduct();
                setProduct(data.data)
                console.log(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    const productData = useMemo(() => {
        return(
            product && product.map((item, index) => {
                let copy = item
                copy['stt'] = index + 1
                return copy
            })
        ) 
    }
        , [product])
        productData ? console.log('y', productData) : console.log('x')

    const productsColumns2 = useMemo(() => 
        (product && product[0]) ?
            [
                {
                    Header: "STT",
                    accessor: Object.keys(product[0])[10]
                },
                {
                    Header: "Tên sản phẩm",
                    accessor: Object.keys(product[0])[1]
                },
                {
                    Header: "Mô tả",
                    accessor: Object.keys(product[0])[2]
                },
                {
                    Header: "Ngày tạo",
                    accessor: Object.keys(product[0])[7]
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

    const tableIn = useTable({ columns: productsColumns2, data: productData });
    // console.log(columns)
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableIn;
    return (
        product &&
        <>
            <div className="title-container">
                <h5 className="px-3">Quản lý sản phẩm</h5>
                <hr />
            </div>
            <hr style={{ margin: '0' }} />
            <div className="container mt-2">
                <div className="content-container">
                    <div className="mb-3 mt-3">
                        <button className="btn btn-primary">
                            Thêm sản phẩm
                        </button>
                    </div>
                    <table {...getTableProps()} className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            {headerGroups.map((headerGroup) => {
                                return (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => {
                                            return (
                                                <th {...column.getHeaderProps()}>
                                                    {column.render("Header")}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
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
                </div>
            </div>
        </>
    )
}

export default ProductManager