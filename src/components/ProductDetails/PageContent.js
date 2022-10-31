import ProductDetailsTop from "./ProductDetailsTop"


const PageContent = () => {

    return (
        <div className="page-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <ProductDetailsTop />
                    </div>
                    <aside className="col-lg-3"></aside>
                </div>
            </div>
        </div>
    )
}

export default PageContent