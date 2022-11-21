import { useState } from "react"

const FilterOption = (props) => {

    // const [curOption, setCurOption] = useState(props.option[0].id)
    // console.log(arrOption);
    // const handleOnChange = (item) => {
    //     setCurOption(item.id)

    // }

    return (
        <div className="widget widget-collapsible">
            <span style={{fontSize: '1.6rem', fontWeight: '600'}}>
                    {props.title}
            </span>
            <div className="collapse show" >
                <div className="widget-body">
                    <div className="filter-items filter-items-count">
                        {props.option && props.option.map((item, index) => {
                            return (<div className="filter-item" key={item.id}>
                                <div className="custom-control custom-checkbox">
                                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', fontSize: '1.4rem'}}>
                                        <input type="checkbox" 
                                        checked={props.curOption === item.id ? true : false}
                                        onChange={() => props.handleOnChange(item)}
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
            <hr style={{margin: '0px'}}/>
        </div>
        
    )
}

export default FilterOption