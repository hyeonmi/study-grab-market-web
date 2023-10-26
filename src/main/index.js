import './index.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {API_URL} from "../config/constants";
import {Carousel} from "antd";
import ProductCard from "../components/productCard";

dayjs.extend(relativeTime)
dayjs.locale('ko')
function MainPage(){
    const [products, setProducts] = useState([])
    const [banners, setBanners] = useState([])

    useEffect(function(){
        axios.get(`${API_URL}/products`)
            .then((result) => {
                const { products } = result.data
                setProducts(products)
            })
            .catch((error)=> {
                console.error(error)
            })

        axios.get(`${API_URL}/banners`)
            .then((result) => {
                const { banners } = result.data
                setBanners(banners)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return <div>
        <Carousel autoplay={true} autoplaySpeed={3000}>
        { banners.map((banner, index) => (
            <Link to={banner.href} key={`banner-${index}`}>
                <div id="banner">
                    <img src={`${API_URL}/${banner.imageUrl}`} alt="배너" />
                </div>
            </Link>
        ))}
        </Carousel>
        <h1>판매되는 상품들</h1>
        <div id="product-list">
            {
                products.map((product, index) => (<ProductCard product={product} key={`product-${index}`} />))
            }
        </div>
    </div>

}

export default MainPage;
