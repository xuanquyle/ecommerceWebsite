import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormText } from 'reactstrap';
import React from 'react';
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Option from './Option';
import { getAllCategory, createProduct } from '../../Api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../ultils/constant';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

const ModalProduct = (props) => {

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
    const closeBtn = (
        <button className="btn-sm btn-danger" onClick={props.toggle} type="button">
            &times;
        </button>
    );
    // STATE
    const [arrCate, setArrCate] = useState();
    const [numOption, setNumOption] = useState(props.product ? Object.keys(props.product.options).length : '1');
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();
    const [isOpenImage, setIsOpenImage] = useState(false)
    // 
    var curNumOptions = props.product.options ? Object.keys(props.product.options).length : '0';
    useEffect(() => {
        reset()
        setNumOption(props.product ? Object.keys(props.product.options).length : '1')
        curNumOptions = props.product.options ? Object.keys(props.product.options).length : '0';
    }, [props.product])

    const fetchCate = async () => {
        try {
            const data = await getAllCategory();
            setArrCate(data.data)
            // console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCate();
    }, [])
    const handleAddOPtion = () => {
        const copy = Number(numOption) + 1
        setNumOption(copy);
    }
    const handleRemoveOPtion = () => {
        const copy = (numOption > 1) ? Number(numOption) - 1 : 1
        setNumOption(copy);
    }
    const onSubmit = async (data) => {
        let newdata = data
        let option = []
        for (let i = 0; i < numOption; i++) {
            let copy = {
                'ram': data['ram' + i], 'rom': data['rom' + i], 'color': data['color' + i],
                'qty': data['qty' + i], 'price': data['price' + i]
            }
            option.push(copy)
            delete newdata['ram' + i]
            delete newdata['rom' + i]
            delete newdata['color' + i]
            delete newdata['qty' + i]
            delete newdata['price' + i]
        }
        newdata['options'] = option;
        delete newdata.thumb

        const formData = new FormData();
        formData.append("thumb", image);
        formData.append('data', JSON.stringify(newdata));
        // formData.append('short_description', newdata.short_description);
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        // console.log('>>>dddd', formData);
        // Array.from(image).map((item) => {
        //     formData.append("image", item);
        // })
        // console.log('data', newdata.name)
        try {
            const data = await createProduct(formData);
            notify('success', 'Tạo sản phẩm thành công !')
        } catch (error) {
            // console.log(error);
            //    if (error) notify('error', error.response.data.message)
        }

        props.updateData();
        props.toggle();
        onResetFrom();
    }
    const onSubmitUpdate = (data) => {
        let newdata = data
        let option = []
        for (let i = 0; i < numOption; i++) {
            let copy = {
                'ram': Number(data['ram' + i]), 'rom': Number(data['rom' + i]), 'color': Number(data['color' + i]),
                'qty': Number(data['qty' + i]), 'price': Number(data['price' + i])
            }
            option.push(copy)
        }
        for (let i = 0; i < (numOption > curNumOptions ? numOption : curNumOptions); i++) {
            delete newdata['ram' + i]
            delete newdata['rom' + i]
            delete newdata['color' + i]
            delete newdata['qty' + i]
            delete newdata['price' + i]
        }
        newdata['options'] = option;
        console.log('dt', image);
        newdata['image'] = image;
        props.updateData();
        onResetFrom();
        props.toggle();
    }
    const onResetFrom = () => {
        reset()
        setNumOption('1')
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const onChangeImage = (e) => {

        let file = e[0];
        const objectUrl = URL.createObjectURL(file)
        setImage(file);
        console.log(file);
        setPreviewImage(objectUrl);
        // setValue('image', e)
    }
    return (
        <>


            <div>
                {/* LIGHTBOX */}
                {isOpenImage === true &&
                    <Lightbox
                        reactModalStyle={{
                            overlay: {
                                zIndex: 5000,
                            }
                        }}
                        mainSrc={previewImage ? previewImage : ''}
                        onCloseRequest={() => setIsOpenImage(false)}
                    />
                }
                <ToastContainer />
                {/* CREATE */}
                {(props.action === 'create') && (
                    <Modal isOpen={props.isOpen} toggle={props.toggle}
                        className={'container'}
                        size={'xl'} >

                        <ModalHeader toggle={props.toggle} close={closeBtn}>
                            Thêm sản phẩm
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">ID</label>
                                        <input type="text" className="form-control" id="inputEmail4"
                                            readOnly />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="inputPassword4">Tên sản phẩm</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="Tên sản phẩm..."
                                            {...register("name", {
                                                required: true,
                                                minLength: 6
                                            })} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputAddress">Danh mục</label>
                                        <select className="form-control" id="inputAddress"
                                            {...register("category", {
                                                // required: true,
                                            })}>
                                            {arrCate && arrCate.map((item, index) => {
                                                return (
                                                    <option value={item._id} key={item._id}>{capitalizeFirstLetter(item.name)}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="inputAddress">Mô tả ngắn</label>
                                        <input type="textarea" className="form-control" id="inputAddress" placeholder="Mô tả sản phẩm..."
                                            {...register("short_description", {
                                                // required: true,
                                            })} />
                                    </div>
                                </div>
                                <div >
                                    <hr />
                                    <div className='d-flex justify-content-between'>
                                        <div><h5>Tùy chọn</h5></div>
                                        <div>
                                            <button className='btn-danger mr-3'><i className="fas fa-minus"
                                                onClick={handleRemoveOPtion}
                                                style={{ fontWeight: '600' }}></i>
                                            </button>
                                            <button className='btn-primary'><i className="fas fa-plus"
                                                onClick={handleAddOPtion}
                                                style={{ fontWeight: '600' }}></i>
                                            </button>
                                        </div>
                                    </div>
                                    {/* OPTION */}
                                    {numOption && (() => {
                                        const option = []
                                        for (let i = 0; i < numOption; i++) {
                                            option.push(
                                                <div key={i}>
                                                    <Option
                                                        index={i}
                                                        register={register}
                                                        action={"create"} />
                                                    <hr />
                                                </div>
                                            )
                                        }
                                        return option
                                    })()}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Mô tả chi tiết</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"
                                        placeholder='Mô tả chi tiết...'
                                        {...register("description", {
                                            // required: true
                                        })} ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1" className='btn btn-outline-info'>
                                        Tải ảnh
                                        <i className="fas fa-upload" style={{ fontWeight: '600', marginLeft: '10px' }}></i>
                                    </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${previewImage})` }}
                                        onClick={() => setIsOpenImage(true)}>
                                    </div>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile1"
                                        hidden multiple
                                        {...register("thumb", {
                                            onChange: (e) => onChangeImage(e.target.files),
                                            // multiple: true, 
                                            // required: true
                                        })} />
                                </div>
                                <button type="submit" className="btn btn-primary">Thêm</button>
                                <button className="btn btn-warning ml-5"
                                    onClick={onResetFrom}>
                                    <i className="fas fa-sync" style={{ fontWeight: '600' }}></i>
                                </button>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={props.toggle}>
                                Hủy
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}

                {/* UPDATE */}

                {(props.action === 'update' && props.product) && (
                    <Modal isOpen={props.isOpen} toggle={props.toggle}
                        className={'container'}
                        size={'xl'} >
                        <ModalHeader toggle={props.toggle} close={closeBtn}>
                            Sửa sản phẩm
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmitUpdate)}>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">ID</label>
                                        <input type="text" className="form-control" id="inputEmail4"
                                            defaultValue={props.product._id}
                                            readOnly />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="inputPassword4">Tên sản phẩm</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="Tên sản phẩm..."
                                            defaultValue={props.product.name}
                                            {...register("name", {
                                                required: true,
                                                minLength: 6
                                            })} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputAddress">Danh mục</label>
                                        <select className="form-control" id="inputAddress"
                                            defaultValue={props.product.category_id}
                                            {...register("category", {
                                                required: true,
                                            })}>
                                            {arrCate && arrCate.map((item, index) => {
                                                return (
                                                    <option value={item._id} key={item._id}>{capitalizeFirstLetter(item.name)}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="inputAddress">Mô tả ngắn</label>
                                        <input type="textarea" className="form-control" id="inputAddress" placeholder="Mô tả sản phẩm..."
                                            defaultValue={props.product.short_description}
                                            {...register("short_description", {
                                                required: true,
                                            })} />
                                    </div>
                                </div>
                                <div >
                                    <hr />
                                    <div className='d-flex justify-content-between'>
                                        <div><h5>Tùy chọn</h5></div>
                                        <div>
                                            <button className='btn-danger mr-3'><i className="fas fa-minus"
                                                onClick={handleRemoveOPtion}
                                                style={{ fontWeight: '600' }}></i>
                                            </button>
                                            <button className='btn-primary'><i className="fas fa-plus"
                                                onClick={handleAddOPtion}
                                                style={{ fontWeight: '600' }}></i>
                                            </button>
                                        </div>
                                    </div>
                                    {/* OPTION */}
                                    {numOption && (() => {
                                        const option = []
                                        for (let i = 0; i < numOption; i++) {
                                            option.push(
                                                <div key={i}>
                                                    <Option
                                                        index={i}
                                                        option={props.product.options[i]}
                                                        register={register}
                                                        action={"update"} />
                                                    <hr />
                                                </div>
                                            )
                                        }
                                        return option
                                    })()}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Mô tả chi tiết</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"
                                        placeholder='Mô tả chi tiết...'
                                        defaultValue={props.product.description}
                                        {...register("description", {
                                            required: true
                                        })} ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Lưu</button>
                                <button className="btn btn-warning ml-5"
                                    onClick={onResetFrom}>
                                    <i className="fas fa-sync" style={{ fontWeight: '600' }}></i>
                                </button>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={props.toggle}>
                                Hủy
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}



                {/* READ */}
                {(props.action === 'read' && props.product) && (
                    <Modal isOpen={props.isOpen} toggle={props.toggle}
                        className={'container'}
                        size={'xl'} >
                        <ModalHeader toggle={props.toggle} close={closeBtn}>
                            Xem sản phẩm
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">ID</label>
                                        <input type="text" className="form-control" id="inputEmail4"
                                            value={props.product._id}
                                            readOnly />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="inputPassword4">Tên sản phẩm</label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="Tên sản phẩm..."
                                            value={props.product.name}
                                            readOnly />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputAddress">Danh mục</label>
                                        <select className="form-control select-read" id="inputAddress"
                                            defaultValue={props.product.category_id} disabled
                                            {...register("category", {
                                                required: true,
                                            })}>
                                            {/* <option >
                                            {arrCate && arrCate.map((item) => {
                                                if (item._id === props.product.category_id)
                                                    return (
                                                        capitalizeFirstLetter(item.name)
                                                    )

                                            })}
                                        </option> */}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label htmlFor="inputAddress">Mô tả ngắn</label>
                                        <input type="textarea" className="form-control" id="inputAddress" placeholder="Mô tả sản phẩm..."
                                            value={props.product.short_description}
                                            readOnly />
                                    </div>
                                </div>
                                <div >
                                    <hr />
                                    <div className='d-flex justify-content-between'>
                                        <div><h5>Tùy chọn</h5></div>
                                    </div>
                                    {/* OPTION */}
                                    {props.product.options && props.product.options.map((item, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                option={item}
                                                action={"read"} />
                                        )
                                    })}
                                </div>
                                <div className="form-group form-textarea">
                                    <label htmlFor="exampleFormControlTextarea1">Mô tả chi tiết</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"
                                        placeholder='Mô tả chi tiết...'
                                        value={props.product.description}
                                        disabled ></textarea>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={props.toggle}>
                                Hủy
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default ModalProduct