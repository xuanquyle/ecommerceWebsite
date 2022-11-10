// import ReactTable from 'react-table'
// import 'react-table/react-table.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProvinces } from '../../api'
import ModalAddress from './ModalAddress';

const Address = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [cart, setCart] = useState([
        { id: '001', name: 'Beige knitted ', price: 'shoes', quantity: 'elastic runner ', a: 'elastic runner ' },
        { id: '003', name: 'Beige knitted ', price: 'elastic  shoes', quantity: 'runner', a: 'elastic runner ' },
        { id: '002', name: 'Beige knitted ', price: 'elastic shoes', quantity: 'runner', a: 'elastic runner ' },
    ]);

    const [provinces, setProvinces] = useState('');

    useEffect(() => {
        let getPronvice = async () => {
            let data = await getAllProvinces();
            setProvinces(data.data.data.data);
            // console.log('>>>', data.data.data.data);
        }

        getPronvice();
    }, [])

    const handleAddAR = () => {
        setIsOpenModal(true)
    }
    const toggle = () => setIsOpenModal(!isOpenModal);
    return (
        <div className="col-md-8">
            <ModalAddress
            isOpen = {isOpenModal}
            toggle = {toggle} />
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <table className="table table-cart table-mobile" style={{ margin: '10px' }}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tỉnh, thành phố</th>
                                    <th>Huyện</th>
                                    <th>Xã</th>
                                    <th>Số nhà, tên đường</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart && cart.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="product-col">
                                                <div className="product">
                                                    <h3 className="product-title">
                                                        <Link to="/ProductDetails">{item.id}</Link>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <div className="product">
                                                    <h3 className="product-title">
                                                        <Link to="/ProductDetails">{item.name}</Link>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="product-col">{item.price}<sup>đ</sup></td>
                                            <td className="product-col">
                                                <div className="cart-product-quantity">
                                                    <input type="number" className="form-control"
                                                        style={{ fontSize: '16px' }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-col">$84.00</td>
                                            <td className="product-col">
                                                <button type="button"
                                                    className="btn-info btn-sm"
                                                    style={{ fontSize: '1.4rem' }}><i className="icon-edit"></i>Sửa</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="col-sm-12 mt-2 mb-2 mr-2" style={{ display: 'flex', justifyContent: 'right' }}>
                            <button 
                            className="btn btn-info"
                            onClick={() => handleAddAR()}><i className="icon-plus" style={{marginLeft: '0'}}></i> Thêm địa chỉ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address