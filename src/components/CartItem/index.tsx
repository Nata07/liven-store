import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md";
import { useCart } from "../../hook/useCart";

interface Product {
  id: number;
  createdAt: string;
  name:  string;
  price: number;
  image: string;
  stock: number;
  loading?: boolean;
  amount: number;
}

interface ProductData {
  product: Product;
}

export function CartItem({product}: ProductData) {

  const { removeProduct, updateProductAmount } = useCart();

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
  )
}