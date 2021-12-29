import { MdAddShoppingCart } from "react-icons/md";
import Loader from "react-loader-spinner";
import { useCart } from "../../hook/useCart";

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

interface ProductData {
  product: Product;
}

interface CartItemsAmount {
  [key: number]: number;
}

export function ProductItem({ product }: ProductData) {

  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;

    return sumAmount;
  }, {} as CartItemsAmount)

  return (
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
  )
}