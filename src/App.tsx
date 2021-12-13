import { Header } from "./components/Header"
import axios from 'axios'
import { useEffect, useState } from "react"
import { MdAddShoppingCart } from "react-icons/md"

import styles from './App.module.scss';
import Loader from "react-loader-spinner";
import { api } from "./services/api";
import { useCart } from "./hook/useCart";

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

export function App() {
  
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
    <>
    <Header />

    <ul className={styles.u}>

      {products.map(product => (
        <li key={product.id}>
          <figure>
            <img src={product.image} alt={product.name} />
          </figure>
          <strong>{product.name}</strong>

          <div>
            <span>{product.price}</span>

            <button type="button" onClick={() => addProduct(product.id)}>
              {product.loading ? (
                <Loader type="Oval" color="#FFF" height={16} width={24} />
              ) : (
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {cartItemsAmount[product.id] || 0}
                </div>
              )}

              <span>Adicionar ao carrinho</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
    </>
  )
}
