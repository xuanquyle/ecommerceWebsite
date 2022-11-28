import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react'

const Setting = () => {

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();
    const [isOpenImage, setIsOpenImage] = useState(false)
    const arrIamge = [
        { id: '1', name: 'anh1.jpg' },
        { id: '2', name: 'anh1.jpg' }
    ]

    const onChangeImage = (e) => {

        let file = e[0];
        const objectUrl = URL.createObjectURL(file)
        setImage(file);
        console.log(file);
        setPreviewImage(objectUrl);
        // setValue('image', e)
    }
    const onSubmit = () => {

    }
    return (
        <div>
            <div className="title-container">
                <h5 className="px-3">Tùy chỉnh trang User</h5>
                <hr />
            </div>
            <hr style={{ margin: '0' }} />
            <div className="container mt-2">
                <div className="form-group">
                    <div className='mt-4 mb-4'>
                        <h6>Ảnh Slider</h6>
                        <hr />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="form-group col-md-3">
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
                            <div className="form-group col-md-9">
                                {arrIamge.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <span className='mr-5'>{item.name}</span>
                                            <button className='btn-sm  btn-danger'>x</button>
                                        </div>
                                    )

                                })}
                            </div>
                        </div>
                        <button className='btn btn-primary'>Lưu</button>
                    </form>
                </div>
                <div className="form-group">
                    <div className='mt-4 mb-4'>
                        <h6>Thông tin Liên hệ</h6>
                        <hr />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    {...register("name", {
                                        required: true,
                                        minLength: 6
                                    })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Zalo</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder=""
                                    {...register("name", {
                                        required: true,
                                        minLength: 6
                                    })} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Facebook</label>
                                <input type="text" className="form-control" id="inputEmail4"
                                    {...register("name", {
                                        required: true,
                                        minLength: 6
                                    })} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Instagram</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder=""
                                    {...register("name", {
                                        required: true,
                                        minLength: 6
                                    })} />
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Setting