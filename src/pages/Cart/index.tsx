import { useEffect, useState } from "react";
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md";
import { Header } from "../../components/Header";
import { useCart } from "../../hook/useCart";

interface Product {
  id: number;
  createdAt: string;
  name:  string;
  price: number;
  image: string;
  stock: number;
  amount: number;
}

import styles from './styles.module.scss';


export function Cart() {

  const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  const { cart, removeProduct, updateProductAmount } = useCart();

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

    function handleRemoveProduct(productId: number) {
      removeProduct(productId)
    }
     function handleProductIncrement(product: Product) {
    updateProductAmount({productId: product.id, amount: product.amount + 1})
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({productId: product.id, amount: product.amount - 1})
  }

  
  
  return (
    <>
    <Header />
    <div className={styles.container}>
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
            <tr key={product.id} data-testid="product">
              <td>
                <img src={product.image} alt="Tênis de Caminhada Leve Confortável" />
              </td>
              <td>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                  disabled={product.stock <= 1}
                  onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                  onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.price}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
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
    </div>
  </>
  )
}

