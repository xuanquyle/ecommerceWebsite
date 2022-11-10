import { useState } from "react"

const FilterOption = (props) => {

    const [curOption, setCurOption] = useState(props.option[0].id)
    const [arrOption, setArrOption] = useState(props.option)
    console.log(arrOption);
    const handleOnChange = (item) => {
        setCurOption(item.id)

    }

    return (
        <div className="widget widget-collapsible">
            <span style={{fontSize: '1.6rem', fontWeight: '600'}}>
                    {props.title}
            </span>
            <div className="collapse show" >
                <div className="widget-body">
                    <div className="filter-items filter-items-count">
                        {arrOption && arrOption.map((item, index) => {
                            return (<div className="filter-item" key={item.id}>
                                <div className="custom-control custom-checkbox">
                                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', fontSize: '1.4rem'}}>
                                        <input type="checkbox" 
                                        checked={curOption === item.id ? true : false}
                                        onChange={() => handleOnChange(item)}
                                        className="custom-input-check" />
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
        
    )
}

export default FilterOption