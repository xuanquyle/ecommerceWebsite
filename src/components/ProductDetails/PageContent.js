import ProductDetailsTop from "./ProductDetailsTop"
import Description from "../ProductDetails/Description"
import { useState, useEffect } from "react"
import axios from "axios"
import { getProductBySlug } from "../../api"
import { useParams } from "react-router-dom"

const PageContent = () => {

    const [product, setProduct] = useState();
    const slug = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("slug", slug)
                const data = await getProductBySlug(slug.slug);
                setProduct(data.data.product[0])
                console.log('sss', data.data.product[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        // console.log(product);
    }, [])

    return (
        product && (
            <div className="page-content">
                <div className="mt-5"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ProductDetailsTop
                                product={product} />
                        </div>
                        {/* <aside className="col-lg-3"></aside> */}
                    </div>
                </div>
                <div style={{ backgroundColor: '#d3e4f3' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Description
                                    product={product} />
                            </div>
                            {/* <aside className="col-lg-3"></aside> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default PageContent