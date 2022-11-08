import FilterOption from "./FilterOption";

const Filters = () => {

    const arrPrice = [
        { id: '001', price: '5', content: 'Dưới 10 triệu' },
        { id: '002', price: '10', content: 'Từ 10 đến 15 triệu' },
        { id: '003', price: '15', content: 'Từ 10 đến 15 triệu' },
        { id: '005', price: '25', content: 'Từ 15 đến 20 triệu' },
        { id: '004', price: '20', content: 'Từ 20 đến 25 triệu' },
        { id: '006', price: '30', content: 'Trên 25 triệu' },
    ];

    return (
        <div className="filter-content">
            {/* <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                    <label>Lọc:</label>
                    <span className="sidebar-filter-clear">Clean All</span>
                </div>
            </div> */}
            <div style={{ padding: '30px' }}>
                <FilterOption
                title="Giá"
                option={arrPrice} />
            </div>
        </div>
    )
}

export default Filters