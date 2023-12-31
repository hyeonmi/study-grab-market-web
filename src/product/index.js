import './index.css'
import { useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import dayjs from "dayjs";
import {API_URL} from "../config/constants";
import {Button, message} from "antd";
import ProductCard from "../components/productCard";
function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([])

    const getProduct = () => {
        axios.get(`${API_URL}/products/${id}`)
            .then((result) => {
                setProduct(result.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const getRecommendations = () => {
        axios.get(`${API_URL}/products/${id}/recommendation`)
            .then((result) => {
                const { products } = result.data
                console.log(products)
                setProducts(products)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const onClickPurchase = () => {
        axios.post(`${API_URL}/purchase/${id}`)
            .then((result) => {
                if(result){
                    message.info("구매가 완료되었습니다.")
                    getProduct()
                }
            }).catch((error) => {
                console.error("에러가 발생했습니다.", error)
            })
    };

    useEffect(() => {
       getProduct()
        getRecommendations()
    }, [])

    if(product === null){
        return <h1>상품 정보를 받고 있습니다.</h1>
    }

    return (
        <div>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt="profile" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">{dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</div>
                <Button id="purchase-button" size="large" type="primary" danger onClick={onClickPurchase} disabled={product.soldout === 1}>구매하기</Button>
                <pre id="description">{product.description} </pre>
            </div>
            <div>
                <h1>추천상품</h1>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {products.map((product, index) => (<ProductCard product={product} key={`product-${index}`} />))}
                </div>
            </div>
        </div>
    )
  }
export default ProductPage
