// import ReactTable from 'react-table'
// import 'react-table/react-table.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProvinces, deleteAddress } from '../../api'
import { connect, useSelector } from "react-redux";
import ModalAddress from './ModalAddress';
import { useOutletContext } from 'react-router-dom';
import { notify } from '../../utils/constant';

const Address = (props) => {
    const userselector = useSelector(state => state);
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [cart, setCart] = useState();
    const [profile, getProfile] = useOutletContext()

    const [provinces, setProvinces] = useState('');
    // const getDataAddress = async () => {
    //     console.log(props.user)
    //     if (props.user) {
    //         try {
    //             const data = await getAllAddress(props.user.IsLoggedIn, props.user.id)
    //             console.log(data);
    //         } catch (error) {

    //         }
    //     }

    // }
    useEffect(() => {
        let getPronvice = async () => {
            try {
                let data = await getAllProvinces();
                setProvinces(data.data.data.data);
                // console.log('>>>', data.data.data.data);
            } catch (error) {

            }
        }

        getPronvice();
        // getDataAddress();
    }, [])

    const handleAddAR = () => {
        setIsOpenModal(true)
    }
    const toggle = () => {
        setIsOpenModal(!isOpenModal);
        getProfile();
    }
    // if(props.profile) console.log('có')
    // console.log('có', profile)
    // getProfile();
    // DELETE
    const onDeleteAddress = async (idAddress) => {
        try {
            const rep = await deleteAddress(props.user.isLoggedIn, props.user.id, idAddress)
            notify('success', 'Xóa địa chỉ thành công !')
            getProfile();
        } catch (error) {

        }
    }
    return (
        profile &&
        <div className="col-md-8">
            <ModalAddress
                isOpen={isOpenModal}
                toggle={toggle}
                // reloadData={getProfile} 
                />
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row m-3">
                        <table className="table table-cart table-mobile" style={{ margin: '10px' }}>
                            <thead>
                                <tr>
                                    <th>Tên người nhận</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profile.addresses && profile.addresses.map((item, index) => {
                                    return (
                                        <tr key={item._id}>
                                            <td className="product-col">
                                                <div className="product">
                                                    {item.customer_name}
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <div className="product">
                                                    {item.customer_phone}
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <div className="product">
                                                    {item.address}
                                                </div>
                                            </td>
                                            <td className="product-col">
                                                <button type="button"
                                                    className="btn-danger btn-sm"
                                                    style={{ fontSize: '1.4rem' }}
                                                    onClick={() => onDeleteAddress(item._id)}><i className="icon-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="col-sm-12 mt-2 mb-2 mr-2" style={{ display: 'flex', justifyContent: 'right' }}>
                            <button
                                className="btn btn-info"
                                style={{ borderRadius: "5px" }}
                                onClick={() => handleAddAR()}><i className="icon-plus" style={{ marginLeft: '0' }}></i> Thêm địa chỉ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProp = state => {
    return {
        user: state.userLogin
    }
}


export default connect(mapStateToProp)(Address);