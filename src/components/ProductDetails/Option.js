import { useState } from "react";

const Option = (props) => {
    
    // const [curOption, setCurOption] = useState(props.option[0]._id)
    // const [arrOption, setArrOption] = useState(props.option)
    // console.log('arr', props.option)
    const clickOption = (item) => {
        props.handleChangeOption(item.op)
    }
    return (
        <div className="details-filter-row details-row-size">
            {props.option && props.option.map((item, index) => {
                return (
                    (item.s === 1)
                        ? <div className={'btn-choose' + (props.curOption === item.op ? ' actived' : '')}
                            key={item.id}
                            onClick={() => clickOption(item)}>
                            {item.op}{props.unit}
                        </div>
                        :
                        <div className={'btn-choose' }
                        hidden
                        style={{opacity: '0.2'}}
                            key={item.id}>
                            {item.op}{props.unit}
                        </div>
                )
            })}
        </div>
    )
}

export default Option