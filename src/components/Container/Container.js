import NewArrivalTittle from "./NewArrivals/NewArrivalTittle"
import NewArrivalsContent from "./NewArrivals/NewArrivalContent"
import ExPopularCate from "./ExPolularCate.js/ExPopularCate"
import TredingProducts from "./TrendingProducts/TrendingProducts"
import Recomandation from "./Recomandation/Recomandation"

import { useState, useEffect } from "react"
import { getAllProduct } from "../../api"

const Container = () => {

    const [arrProduct, setArrProduct] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProduct();
                console.log('a', data.data);
                const a = data.data.sort((a, b) => {
                    let da = new Date(a.createdAt),
                        db = new Date(b.createdAt);
                    return db - da;
                })
                console.log('sort', a);
                // if(data.data[0].createdAt <= data.data[1].createdAt) console.log('a',);
                setArrProduct(a);
            } catch (error) {

            }
        }
        fetchData();
    }, [])
    return (
        <>
            <ExPopularCate />
            <div className="container new-arrivals">
                <NewArrivalTittle />
                <NewArrivalsContent
                    arrProduct={arrProduct} />
            </div>
            <TredingProducts
                arrProduct={arrProduct} />
            <Recomandation
                arrProduct={arrProduct} />
        </>

    )

}

export default Container