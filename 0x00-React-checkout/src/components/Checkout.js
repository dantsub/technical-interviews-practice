import { useEffect, useState } from "react";
import styles from "../Checkout.module.css";
import useProducts from "../hooks/useProducts";
import { LoadingIcon } from "../Icons";
import Product from "./Product";
import { calucuteDiscount } from "../utils/calucuteDiscount";

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places

const Checkout = () => {
  const [total, setTotal] = useState(0);
  const [isDiscount, setIsDiscount] = useState(false);
  const { isLoading, products, prices, modifyPrice } = useProducts();

  useEffect(() => {
    if (total >= 1000) {
      setIsDiscount(true);
    } else {
      setIsDiscount(false);
    }
  }, [total]);

  useEffect(() => {
    setTotal(prices.reduce((acc, curr) => acc + curr, 0));
  }, [prices]);

  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>
      <main>
        {isLoading && <LoadingIcon />}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <Product
                key={product.id}
                {...product}
                updateSummary={modifyPrice}
              />
            ))}
          </tbody>
        </table>
        <h2>Order summary</h2>
        <p>
          Discount: $
          {isDiscount
            ? calucuteDiscount(10, total).toFixed(2)
            : "0.00"}
        </p>
        <p>
          Total: $
          {isDiscount
            ? (total - calucuteDiscount(10, total)).toFixed(2)
            : total.toFixed(2)}
        </p>
      </main>
    </div>
  );
};

export default Checkout;
