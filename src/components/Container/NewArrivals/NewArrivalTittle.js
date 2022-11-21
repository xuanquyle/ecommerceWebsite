const NewArrivalTittle = () => {

    const arrItem = [
        { id: '000', tittle: 'All' },
        { id: '001', tittle: 'Smart Phone' },
        { id: '002', tittle: 'Laptop' },
        { id: '003', tittle: 'Accessories' },
        { id: '004', tittle: 'Smartwatches' }
    ]
    return (
        <div className="heading heading-flex mb-3">
            <div className="heading-left">
                <h2 className="title">SẢN PHẨM MỚI</h2>
            </div>
            {/* <div className="heading-right">
                <ul className="nav nav-pills nav-border-anim justify-content-center" role="tablist">
                    {arrItem && arrItem.map((item, index) => {
                        return (
                            <li className="nav-item" key={item.id}>
                                {/* <a className="nav-link" id="new-acc-link" data-toggle="tab" href="/" role="tab" aria-controls="new-acc-tab" aria-selected="false">{item.tittle}</a> 
                                <p className="nav-link" id="new-acc-link" data-toggle="tab" role="tab" aria-controls="new-acc-tab" aria-selected="false" style={{cursor: 'pointer'}}>{item.tittle}</p>
                            </li>
                        )
                    })}
                </ul>
            </div> */}
        </div>
    )
}
export default NewArrivalTittle