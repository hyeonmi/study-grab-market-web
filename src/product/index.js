import './index.css'
import { useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
function ProductPage() {
    const {id} = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get('https://1204fb75-e2e0-46ba-b255-23facbafaec8.mock.pstmn.io/product/'+id)
            .then(function(result){
                setProduct(result.data)
            })
            .catch(function(error){
                console.error(error)
            })
    }, [])

    if(product === null){
        return <h1>상품 정보를 받고 있습니다.</h1>
    }

    return (
        <div>
            <div id="image-box">
                <img src={`/${product.imageUrl}`} alt={product.name} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt="profile" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">2020년 12월 8일</div>
                <div id="description">{product.description} </div>
            </div>
        </div>
    )
  }
export default ProductPage
