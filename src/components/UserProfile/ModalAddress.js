import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormText } from 'reactstrap';
import { useState, useEffect } from 'react'
import { getAllProvinces, getDistrict, getWard } from '../../api'
import { useForm } from "react-hook-form"
import Address from './Address';
import { createAddress } from '../../api';
import { notify } from "../../utils/constant"
import { ToastContainer } from 'react-toastify';
import { connect } from "react-redux";

const ModalAddress = (props) => {
    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
    const closeBtn = (
        <button className="btn-sm btn-danger" onClick={props.toggle} type="button">
            &times;
        </button>
    );
    const [provinces, setProvinces] = useState('');
    const [districs, setDistrics] = useState('');
    const [wards, setWards] = useState('');
    const [ipProvice, setIpProvice] = useState('')
    const [codeProvice, setCodeProvice] = useState('');
    const [codeDistrics, setCodeDistrics] = useState('');
    const [street, setStreet] = useState('');
    const [address, setAddress] = useState({
        pro: '',
        dis: '',
        ward: '',
        street: '',
        city_code: '',
        town_code: '',
        customer_name: '',
        customer_phone: ''
    })
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
    }, [])

    useEffect(() => {
        let getDistrictById = async (id) => {
            try {
                let data = await getDistrict(id);
                setDistrics(data.data.data.data);
                // console.log('>>>', data.data.data.data);
            } catch (error) {

            }
        }
        if (codeProvice) getDistrictById(codeProvice);
    }, [codeProvice])

    useEffect(() => {
        let getWardById = async (id) => {
            try {
                let data = await getWard(id);
                setWards(data.data.data.data);
                // console.log('>>>', data.data.data.data);
            } catch (error) {

            }
        }
        if (codeDistrics) getWardById(codeDistrics);
    }, [codeDistrics])

    const hanldeChangePro = (e) => {
        let pro = e.target.value;
        setAddress({ ...address, pro: pro })
        var tempPro = provinces.filter(function (provinces) {
            return provinces.name === pro;
        })
        setIpProvice(pro);
        setCodeProvice(tempPro[0].code)
    }
    const hanldeChangeDis = (e) => {
        let dis = e.target.value;
        setAddress({ ...address, dis: dis })
        var tempDis = districs.filter(function (districs) {
            return districs.name === dis;
        })
        // setIpProvice(pro);
        // console.log(tempDis);
        setCodeDistrics(tempDis[0].code)
    }
    const hanldeChangeWard = (e) => {
        let ward = e.target.value;
        setAddress({ ...address, ward: ward })
    }
    const onChangeStreet = (e) => {
        let temp = e.target.value;
        setAddress({ ...address, street: temp })
        setStreet(temp)
    }
    // SUBMIT
    const handleOnSubmit = async (data) => {
        // console.log("data Submit address", data)
        if (address.pro !== "" && address.dis !== "" && address.ward !== "" && address.street !== "") {
            // console.log(address);
            const dataAddress = {
                address: address.street + ", " + address.ward + ", " + address.dis + ", " + address.pro,
                city_code: codeProvice,
                town_code: codeDistrics,
                customer_name: data.customer_name,
                customer_phone: data.customer_phone,
            }
            if (window.confirm('Bạn có thêm địa chỉ này ?')) {
                // console.log("data Submit address", dataAddress)
                try {
                    const rep = await createAddress(props.user.IsLoggedIn,props.user.id, dataAddress)
                    notify('success', 'Thêm địa chỉ thành công !')
                } catch (error) {
                    // console.log('error',error.response.data.message)
                    notify('error', error.response.data.message)
                }
                // props.getProfile();
                setProvinces('')
                setAddress('')
                setDistrics('')
                setCodeDistrics('')
                setCodeProvice('')
                setIpProvice('')
                setWards('')
                setStreet('')
                props.toggle();
            } else {

            }

        } else alert('Xin hãy nhập đủ thông tin !')
    }
    return (
        <div>
            <ToastContainer />
            <Modal isOpen={props.isOpen} toggle={props.toggle}
                // className={'container'}
                size="lg" style={{ maxWidth: '900px', width: '100%' }}>
                <ModalHeader toggle={props.toggle} close={closeBtn}>Thêm địa chỉ</ModalHeader>
                <ModalBody className='p-5'>
                    {/* <div className='container'> */}
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className='form-row'>
                            <div className='form-group col-md-4'>
                                <label>Tỉnh, thành phố</label>
                                <select className="form-control"
                                    style={{ width: '200px' }}
                                    onChange={hanldeChangePro}>
                                    {provinces && provinces.map((item, index) => {
                                        return (
                                            <option key={item._id}>
                                                {item.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='form-group col-md-4'>
                                <label>Huyện, quận</label>
                                <select className="form-control"
                                    style={{ width: '200px' }}
                                    onChange={hanldeChangeDis}>
                                    {districs && districs.map((item, index) => {
                                        return (
                                            <option key={item._id}>
                                                {item.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='form-group col-md-4'>
                                <label>Xã, thị trấn &nbsp;</label>
                                <select className="form-control"
                                    style={{ width: '200px' }}
                                    onChange={hanldeChangeWard}
                                >
                                    {wards && wards.map((item, index) => {
                                        return (
                                            <option key={item._id}>
                                                {item.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-12'>
                                <label>Xã, thị trấn &nbsp;</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    value={street}
                                    onChange={onChangeStreet} />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label>Tên người nhận &nbsp;</label>
                                <input type="text" className="form-control" id="inputEmail4"                                
                                    onChange={onChangeStreet}
                                    {...register("customer_name", {
                                        required: true,
                                        // minLength: 6
                                    })} />
                            </div>
                            <div className='form-group col-md-6'>
                                <label>Số điện thoại &nbsp;</label>
                                <input type="text" className="form-control" id="inputEmail4"                    
                                    onChange={onChangeStreet}
                                    {...register("customer_phone", {
                                        required: true,
                                        minLength: 10
                                    })} />
                            </div>
                        </div>
                        <button className='btn btn-primary' type='submit'>Lưu</button>
                    </form>
                    {/* </div> */}
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" type='submit' onClick={handleSubmit}>
                        Thêm
                    </Button>{' '} */}
                    <Button color="secondary" onClick={props.toggle}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
const mapStateToProp = state => {
    return {
        user: state.userLogin
    }
}
export default connect(mapStateToProp)(ModalAddress);