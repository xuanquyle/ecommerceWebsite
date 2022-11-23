import { useState } from "react"

const FilterOption = (props) => {

    // const [curOption, setCurOption] = useState(props.option[0].id)
    // console.log(props.curOption);
    // const handleOnChange = (item) => {
    //     setCurOption(item.id)

    // }

    return (
        <div className="widget widget-collapsible">
            <span style={{ fontSize: '1.6rem', fontWeight: '600' }}>
                {props.title}
            </span>
            <div className="collapse show" >
                <div className="widget-body">
                    <div className="filter-items filter-items-count d-flex flex-row"
                        style={{ flexWrap: 'wrap' }}>
                        {props.option && props.option.map((item, index) => {
                            return (
                                <div className="filter-item" key={item.id} 
                                style={{minWidth: '50%'}}>
                                    <div className="custom-control custom-checkbox">
                                        <div className="d-flex flex-row" style={{ alignItems: 'center', fontSize: '1.4rem' }}>
                                            <input type="checkbox"
                                                checked={props.curOption === item.id ? true : false}
                                                onChange={() => props.handleOnChange(item)}
                                                className="custom-input-check" />
                                            <div>{item.content}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <hr style={{ margin: '0px' }} />
        </div>

    )
}

export default FilterOption