import { useRouter } from 'next/router'

const ProductsDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Post: {id}</p>
}

export default ProductsDetail;