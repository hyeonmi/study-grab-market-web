import './index.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
function MainPage(){
    const [products, setProducts] = useState([])

    useEffect(function(){
        axios.get('http://localhost:8080/products')
            .then(function(result){
                const { products } = result.data
                setProducts(products)
            })
            .catch(function(error){
                console.error(error)
            })

    }, [])

    return <>
    <div id="banner">
        <img src="/images/banners/banner1.png" alt="배너" />
    </div>
    <h1>판매되는 상품들</h1>
    <div id="product-list">
        {
            products.map((product, index) => (
                <div className="product-card" key={index}>
                    <Link style={{ color: "inherit" }} className="product-link" to={`/product/${product.id}`}>
                        <div>
                            <img className="product-img" src={product.imageUrl} alt={product.name}/>
                        </div>
                        <div className="product-contents">
                            <span className="product-name">{product.name}</span>
                            <span className="product-price">{product.price}</span>
                        </div>
                        <div className="product-footer">
                            <div className="product-seller">
                                <img className="product-avatar" src="/images/icons/avatar.png" alt="판매자" />
                                <span>{product.seller}</span>
                            </div>
                            <span className="product-date">{dayjs(product.createdAt).fromNow()}</span>
                        </div>
                    </Link>
            </div>))
        }

            </div>
    </>

}

export default MainPage;
