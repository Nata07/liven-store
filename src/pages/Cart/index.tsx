import { useEffect, useState } from "react";
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md";
import { Header } from "../../components/Header";

interface Product {
  id: string;
  createdAt: string;
  name:  string;
  price: string;
  image: string;
  stock: number;
}

import styles from './styles.module.scss';

export function Cart() {

  const [cartFormatted, setCartFormatted] = useState<Product[]>([]);


  useEffect(() => {
    const produto = [
      {
        id: "1",
        createdAt: "2019-09-02T12:58:54.103Z",
        name: "Rustic Metal Fish",
        price: "289.00",
        image: "http://lorempixel.com/640/480/food",
        stock: 65171
      },
      {
        id: "1",
        createdAt: "2019-09-02T12:58:54.103Z",
        name: "Rustic Metal Fish",
        price: "289.00",
        image: "http://lorempixel.com/640/480/food",
        stock: 65171
      },
      {
        id: "1",
        createdAt: "2019-09-02T12:58:54.103Z",
        name: "Rustic Metal Fish",
        price: "289.00",
        image: "http://lorempixel.com/640/480/food",
        stock: 65171
      },
    ]

    setCartFormatted(produto);
  })
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
                  onClick={() => handleProductIncrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.stock}
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
          <strong>{100}</strong>
        </div>
      </footer>
    </div>
  </>
  )
}
function handleRemoveProduct(id: any): void {
  throw new Error("Function not implemented.");
}

function handleProductIncrement(product: any): void {
  throw new Error("Function not implemented.");
}

