import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { ProductItem } from "../ProductItem";
import styles from './styles.module.scss';

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

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get<Product[]>('/')
      setProducts(data)
    }
    
    loadProducts();
  }, []);

  return (
    <ul className={styles.u}>
    {products.map(product => (
      <ProductItem product={product} />
    ))}
  </ul>
  )
}