import React from 'react';
// import { useForm } from 'react-hook-form';

const Option = (props) => {
    // const { register, control, handleSubmit, reset, formState: { errors } } = useForm();
    const SelectRam = React.forwardRef(({ onChange, onBlur, name, label, defaultValue }, ref) => (
        <>
            <label>{label}</label>
            <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}
                value={defaultValue}
                className="form-control">
                <option value="2">2GB</option>
                <option value="4">4GB</option>
                <option value="6">6GB</option>
                <option value="8">8GB</option>
                <option value="16">16GB</option>
                <option value="32">32GB</option>
                <option value="64">64GB</option>
                <option value="128">128GB</option>
            </select>
        </>
    ));
    const SelectRom = React.forwardRef(({ onChange, onBlur, name, label, defaultValue }, ref) => (
        <>
            <label>{label}</label>
            <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}
                defaultValue={defaultValue}
                className="form-control">
                <option value="16">16GB</option>
                <option value="32">32GB</option>
                <option value="64">64GB</option>
                <option value="128">128GB</option>
                <option value="256">256GB</option>
                <option value="512">512GB</option>
                <option value="1024">1024GB</option>
                <option value="2048">2048GB</option>
            </select>
        </>
    ));
    // console.log("ram", props.option['ram'])
    return (
        <>
            {(props.action === "create") && (
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <SelectRam label="Ram"
                            {...props.register("ram" + props.index, {
                                defaultValue: '8',
                                required: true
                            })} />
                    </div>
                    <div className="form-group col-md-2">
                        <SelectRom label="Rom"
                            {...props.register("rom" + props.index, {
                                required: true
                            })} />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Màu</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Màu..."
                            {...props.register("color" + props.index, {
                                required: true,
                            })} />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Số lượng</label>
                        <input type="number" className="form-control" id="inputAddress" placeholder="Số lượng..."
                            {...props.register("qty" + props.index, {
                                required: true,
                                Number: true,
                                min: 0
                            })} />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Giá sản phẩm</label>
                        <input type="number" className="form-control" id="inputAddress" placeholder="Giá..."
                            {...props.register("price" + props.index, {
                                required: true,
                                min: 0
                            })} />
                    </div>
                </div>
            )}

            {(props.action === "update") && (
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <SelectRam label="Ram"
                            defaultValue={props.option ? props.option['ram'] : ''}
                            {...props.register("ram" + props.index, {
                                defaultValue: '8',
                                required: true
                            })} />
                    </div>
                    <div className="form-group col-md-2">
                        <SelectRom label="Rom"
                            defaultValue={props.option ? props.option['rom'] : ''}
                            {...props.register("rom" + props.index, {
                                required: true
                            })} />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Màu</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Màu..."
                            defaultValue={props.option ? props.option['color'] : ''}
                            {...props.register("color" + props.index, {
                                required: true,
                            })} />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Số lượng</label>
                        <input type="number" className="form-control" id="inputAddress" placeholder="Số lượng..."
                            defaultValue={props.option ? props.option['qty'] : ''}
                            {...props.register("qty" + props.index, {
                                required: true,
                                Number: true,
                                min: 0
                            })} />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Giá sản phẩm</label>
                        <input type="number" className="form-control" id="inputAddress" placeholder="Giá..."
                            defaultValue={props.option ? props.option['price'] : ''}
                            {...props.register("price" + props.index, {
                                required: true,
                                min: 0
                            })} />
                    </div>
                </div>
            )}

            {(props.action === "read" && props.option) && (
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Ram</label>
                        <select className="form-control" id="inputAddress"
                            disabled
                            defaultValue={props.option['ram']}>
                            <option>{props.option['ram']}GB</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Rom</label>
                        <select className="form-control" id="inputAddress"
                            disabled
                            defaultValue={props.option['rom']}>
                            <option>{props.option['rom']}GB</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Màu</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Màu..."
                            defaultValue={props.option['color']}
                            readOnly />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Số lượng</label>
                        <input type="number" className="form-control" id="inputAddress" placeholder="Số lượng..."
                            defaultValue={props.option['qty']}
                            readOnly />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputAddress">Giá sản phẩm</label>
                        <input type="number" className="form-control" id="inputAddress" placeholder="Giá..."
                            defaultValue={props.option['price']}
                            readOnly />
                    </div>
                </div>
            )}
        </>
    )
}

export default Option