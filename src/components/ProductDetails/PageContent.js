import ProductDetailsTop from "./ProductDetailsTop"
import Description from "../ProductDetails/Description"

const PageContent = () => {

    return (
        <div className="page-content">
            <div className="mt-5"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ProductDetailsTop />
                        <Description />
                    </div>
                    {/* <aside className="col-lg-3"></aside> */}
                </div>
            </div>        
        </div>
    )
}

export default PageContent