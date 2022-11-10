import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react'
import { getAllProvinces, getDistrict } from '../../api'

const ModalAddress = (props) => {

    const closeBtn = (
        <button className="btn-sm btn-danger" onClick={props.toggle} type="button">
            &times;
        </button>
    );
    const [provinces, setProvinces] = useState('');
    const [districs, setDistrics] = useState('');
    const [ipProvice, setIpProvice] = useState('')
    const [codeProvice, setCodeProvice] = useState('');
    useEffect(() => {
        let getPronvice = async () => {
            let data = await getAllProvinces();
            setProvinces(data.data.data.data);
            // console.log('>>>', data.data.data.data);
        }

        getPronvice();
    }, [])

    useEffect(() => {
        let getDistrictById = async (id) => {
            let data = await getDistrict(id);
            // console.log(id);
            setDistrics(data.data.data.data);
            // console.log('>>>', data.data.data.data);
        }

        if (codeProvice) getDistrictById(codeProvice);
    }, [codeProvice])

    const hanldeChangePro = (e) => {
        let pro = e.target.value;
        var tempPro = provinces.filter(function (provinces) {
            return provinces.name === pro;
        })
        setIpProvice(pro);
        setCodeProvice(tempPro[0].code)
    }
    const hanldeChangeDis = (e) => {

    }
    return (
        <div>
            <Modal isOpen={props.isOpen} toggle={props.toggle} >
                <ModalHeader toggle={props.toggle} close={closeBtn}>Thêm địa chỉ</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Tỉnh, thành phố</label>
                                <select
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
                            <div className='col-6 form-group'>
                                <label>Huyện, quận</label>
                                <select
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
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalAddress