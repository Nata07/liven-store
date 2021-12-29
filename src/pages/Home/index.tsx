import { useEffect, useState } from "react"
import { MdAddShoppingCart } from "react-icons/md"

import styles from './styles.module.scss';
import Loader from "react-loader-spinner";
import { useCart } from '../../hook/useCart';
import { api } from '../../services/api';
import { ProductList } from "../../components/ProductList";

interface Product {
  id: number;
  createdAt: string;
  name:  string;
  price: number;
  image: string;
  stock: number;
  loading: boolean;
  amount: number;
}

interface CartItemsAmount {
  [key: number]: number;
}

export function Home() {

  const [products, setProducts] = useState<Product[]>([])
  const [productsAddCart, setProductsAddCart] = useState<Product[]>([])
  
  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get<Product[]>('/')
      setProducts(data)
    }
    
    loadProducts();
  }, []);
  
  function handleAddProduct(product: Product) {
    const produtos = productsAddCart.concat(product)
    
    setProductsAddCart(produtos)
  }

  console.log('productsAddCart')
  console.log(productsAddCart)

  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;

    return sumAmount;
  }, {} as CartItemsAmount)

  return (
    <ProductList />
  )
}