import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { STORAGE_KEY } from "../storage";

interface Product {
  id: number;
  createdAt: string;
  name:  string;
  price: number;
  image: string;
  stock: number;
  amount: number;
}

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem(`${STORAGE_KEY}:cart`)

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });


  const addProduct = async (productId: number) => {
    try {
      const { data: productStock } = await api.get<Product>(`/${productId}`)

      console.log('productStock')
      console.log(productStock)

      if (productStock.stock <= 1) {
        throw new Error('Quantidade solicitada fora de estoque');
      }

      let existingProduct = cart.find(product => product.id === productId)
      let newCart: Product[] = []

      if (!existingProduct) {
        const { data } = await api.get<Omit<Product, 'amount'>>(`/${productId}`)

        existingProduct = {
          ...data,
          amount: 1
        }

        newCart = [...cart, existingProduct];
        setCart(newCart)
      } else {
        newCart = cart.map(product => product.id !== productId ? product : {
          ...product,
          amount: product.amount + 1
        })

        setCart(newCart)
      }

      localStorage.setItem(`${STORAGE_KEY}:cart`, JSON.stringify(newCart))
    } catch(err) {
      console.log(`err.message.includes('fora de estoque') ? err.message : 'Erro na adição do produto'`);
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      const product = cart.find(product => product.id === productId)

      if (!product) {
        throw new Error('Produto não existe')
      }

      const newCart = cart.filter(product => product.id !== productId)

      localStorage.setItem(`${STORAGE_KEY}:cart`, JSON.stringify(newCart))

      setCart(newCart)
    } catch {
      console.log('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount < 1) {
        throw new Error('Quantidade inválida')
      }

      const { data: productStock } = await api.get<Product>(`/${productId}`)

      if (productStock.stock <= 1) {
        console.log('Quantidade solicitada fora de estoque');
        return
      }

      const newCart = cart.map(product => product.id !== productId ? product : {
        ...product,
        amount,
      })

      localStorage.setItem(`${STORAGE_KEY}:cart`, JSON.stringify(newCart))

      setCart(newCart)
    } catch {
      console.log('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}