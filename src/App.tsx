import { Header } from "./components/Header"
import axios from 'axios'
import { useEffect, useState } from "react"
import { MdAddShoppingCart } from "react-icons/md"

import styles from './App.module.scss';

interface Product {
  id: number;
  createdAt: string;
  name:  string;
  price: string;
  image: string;
  stock: number;
}

export function App() {
  
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
    async function loadProducts() {
      const { data } = await axios.get<Product[]>('https://5d6da1df777f670014036125.mockapi.io/api/v1/product?page=1&limit=6')
      setProducts(data)
    }
    
    loadProducts();
  }, [])
  
  function handleAddProduct(id: number): void {
    console.log(id);
  }
  
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

            <button type="button" onClick={() => handleAddProduct(product.id)}>
              {/* {product.loading ? (
                <Loader type="Oval" color="#FFF" height={16} width={24} />
              ) : (
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {amount[product.id] || 0}
                </div>
              )} */}

              <span>Adicionar ao carrinho</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
    </>
  )
}

