import { useParams } from 'react-router-dom'
function ProductPage() {
    const params = useParams()
    return <div>상품 상세 페이지 상품 번호: {params.id}</div>
  }
export default ProductPage
