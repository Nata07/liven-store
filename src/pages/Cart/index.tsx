import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline, MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { CartItem } from "../../components/CartItem";
import { useCart } from "../../hook/useCart";
import { formatPrice } from "../../utils/format";

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

import styles from './styles.module.scss';


export function Cart() {

  const { cart } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormated: formatPrice(product.price),
    priceTotal: formatPrice(product.amount * product.price)
  }))

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        sumTotal += (product.price * product.amount)

        return sumTotal;
      }, 0)
    )
  
  
  return (
    <div className={styles.container}>
      {cartFormatted.length === 0 ? (
        <div className={styles.emptyCar}>
          <MdRemoveShoppingCart />
          <div>
            <h2>Opss...</h2>
            <p>Nenhum produto foi adicionado ao carrinho :(</p>
            <Link to="/" className={styles.buttonProducts}>Veja os Produtos</Link> 
          </div>
        </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th aria-label="product image" />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th aria-label="delete icon" />
              </tr>
            </thead>
            <tbody>
              {cartFormatted.map(product => (
                <CartItem product={product} />
              ))}
            </tbody>
          </table>

          <footer>
            <button type="button">Finalizar pedido</button>

            <div className={styles.total}>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

