import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { ReactNode } from "react";

import { Header } from "../../../components/Header";

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock("../../../hook/useCart", () => {
  return {
    useCart: () => ({
      cart: [
        {
          amount: 2,
          id: "1",
          createdAt: "2019-09-02T12:58:54.103Z",
          name: "Rustic Metal Fish",
          price: "289.00",
          image: "http://lorempixel.com/640/480/food",
          stock: 65171
        },
        {
          amount: 1,
          id: "2",
          createdAt: "2019-09-02T07:59:58.181Z",
          name: "Sleek Wooden Soap",
          price: "430.00",
          image: "http://lorempixel.com/640/480/transport",
          stock: 91260
        },
      ],
    }),
  };
});


/**
 * @jest-environment jsdom
 */
describe("Header Component", () => {
  it("should be able to render the amount of products added to cart", () => {
    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId("cart-size");
    expect(cartSizeCounter).toHaveTextContent("2 itens");
  });
});
