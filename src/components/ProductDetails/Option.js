import { useState } from "react";

const Option = (props) => {
    const [curOption, setCurOption] = useState(props.option[0].id)
    const [arrOption, setArrOption] = useState(props.option)
    const clickOption = (item) => {
        setCurOption(item.id)

    }
    return (
        <div className="details-filter-row details-row-size">
            {arrOption && arrOption.map((item, index) => {
                return (
                    <div className={'btn-choose' + (curOption === item.id ? ' actived' : '')}
                        key={item.id}
                        onClick={() => clickOption(item)}>
                        {item.color}{props.unit}
                    </div>
                )
            })}
        </div>
    )
}

export default Option