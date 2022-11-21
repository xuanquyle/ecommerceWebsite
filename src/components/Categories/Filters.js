import FilterOption from "./FilterOption";
import { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { filter } from "../../store/actions/filterAction"

const Filters = (props) => {
    const dispatch = useDispatch();
    const userselector = useSelector(state => state);
    const arrCate = [
        { id: '000', cate: 'ALL', content: 'Tất cả' },
        { id: '001', cate: '6306f097ba3833d3583ee727', content: 'Laptop' },
        { id: '002', cate: '6306eea9ba3833d3583ee706', content: 'Điện thoại' },
        { id: '003', cate: '6306f09fba3833d3583ee728', content: 'Máy tính bản' },
    ];
    const arrPrice = [
        { id: '000', price: 'ALL', content: 'Tất cả' },
        { id: '001', price: '10', content: 'Dưới 10 triệu' },
        { id: '002', price: '15', content: 'Từ 10 đến 15 triệu' },
        { id: '005', price: '25', content: 'Từ 15 đến 20 triệu' },
        { id: '004', price: '20', content: 'Từ 20 đến 25 triệu' },
        { id: '006', price: '30', content: 'Trên 25 triệu' },
    ];
    const arrRam = [
        { id: '000', ram: 'ALL', content: 'Tất cả' },
        { id: '001', ram: '2', content: '2GB' },
        { id: '002', ram: '4', content: '4GB' },
        { id: '005', ram: '8', content: '8GB' },
        { id: '004', ram: '12', content: '12GB' },
        { id: '006', ram: '16', content: '16GB' },
        { id: '007', ram: '32', content: '32GB' },
        { id: '008', ram: '64', content: '64GB' },
        { id: '009', ram: '128', content: '128GB' },
    ];
    const arrRom = [
        { id: '000', rom: 'ALL', content: 'Tất cả' },
        { id: '001', rom: '16', content: '16GB' },
        { id: '005', rom: '64', content: '64GB' },
        { id: '002', rom: '32', content: '32GB' },
        { id: '004', rom: '128', content: '128GB' },
        { id: '006', rom: '256', content: '256GB' },
        { id: '007', rom: '512', content: '512GB' },
        { id: '008', rom: '1024', content: '1024GB' },
        { id: '009', rom: '2048', content: '2048GB' },
    ];

    const [cate, setCate] = useState(arrCate[0].id);
    const [price, setPrice] = useState(arrPrice[0].id);
    const [ram, setRam] = useState(arrRam[0].id);
    const [rom, setRom] = useState(arrRom[0].id);

    const onChangeCate = (item) => {

        setCate(item.id);
        console.log(props.filters);
        var data = { ...props.filters, price: item.cate };
        // console.log('1111', data);
        // data['price'] = item.price
        localStorage.removeItem('cate');
        localStorage.setItem('cate', JSON.stringify(item.cate));
        dispatch(filter(data));
    }
    const onChangePrice = (item) => {

        setPrice(item.id);
        console.log(props.filters);
        var data = { ...props.filters, price: item.price };
        // console.log('1111', data);
        // data['price'] = item.price
        localStorage.removeItem('price');
        localStorage.setItem('price', JSON.stringify(item.price));
        dispatch(filter(data));
    }

    const onChangeRam = (item) => {

        setRam(item.id);
        var data = { ...props.filters, ram: item.ram };
        // console.log('1111', data);
        localStorage.removeItem('ram');
        localStorage.setItem('ram', JSON.stringify(item.ram));
        dispatch(filter(data));
    }
    const onChangeRom = (item) => {

        setRom(item.id);
        var data = { ...props.filters, rom: item.rom };
        // console.log('1111', data);
        localStorage.removeItem('rom');
        localStorage.setItem('rom', JSON.stringify(item.rom));
        dispatch(filter(data));
    }
    return (
        <div className="filter-content">
            {/* <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                    <label>Lọc:</label>
                    <span className="sidebar-filter-clear">Clean All</span>
                </div>
            </div> */}
            <div style={{ padding: '10px 30px' }}>
                <FilterOption
                    title="Danh mục"
                    option={arrCate}
                    curOption={cate}
                    handleOnChange={(e) => onChangeCate(e)} />
                <FilterOption
                    title="Giá"
                    option={arrPrice}
                    curOption={price}
                    handleOnChange={(e) => onChangePrice(e)} />
                <FilterOption
                    title="Ram"
                    option={arrRam}
                    curOption={ram}
                    handleOnChange={(e) => onChangeRam(e)} />
                <FilterOption
                    title="Rom"
                    option={arrRom}
                    curOption={rom}
                    handleOnChange={(e) => onChangeRom(e)} />
            </div>
        </div>
    )
}

const mapStateToProp = state => {
    return {
        filters: state.filters
    }
}


export default connect(mapStateToProp)(Filters);
