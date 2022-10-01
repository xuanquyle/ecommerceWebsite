import NewArrivalTittle from "./NewArrivals/NewArrivalTittle"
import NewArrivalsContent from "./NewArrivals/NewArrivalContent"
import ExPopularCate from "./ExPolularCate.js/ExPopularCate"
import TredingProducts from "./TrendingProducts/TrendingProducts"
import Recomandation from "./Recomandation/Recomandation"

const Container = () => {
    return (
        <>
            <ExPopularCate />
            <div className="container new-arrivals">
                <NewArrivalTittle />
                <NewArrivalsContent />
            </div>
            <TredingProducts />
            <Recomandation />
        </>

    )

}

export default Container