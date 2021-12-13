import { useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useCart } from '../../hook/useCart';
import styles from './styles.module.scss';

interface Product {
  id: number;
  createdAt: string;
  name:  string;
  price: string;
  image: string;
  stock: number;
  loading: boolean
}

interface HeaderProps {
  cartSize: number;
}

export function Header(){

  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <div className={styles.container}>
     
      <div>
        <Link to="/" className={styles.logo}>
          <h3>Liven-Store</h3>
        </Link>
      </div>
      <Link className={styles.cart} to={'/cart'}>
        <div>
          <strong>Meu carrinho</strong>
          <span data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Link>
    </div>
  );
}