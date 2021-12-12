import { useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import styles from './styles.module.scss';


export function Header(){

  const [cartSize, setCartSize] = useState(0)
  return (
    <div className={styles.container}>
     
      <div>
        <h3>Liven-Store</h3>
      </div>
      <div className={styles.cart}>
        <div>
          <strong>Meu carrinho</strong>
          <span data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </div>
    </div>
  );
}