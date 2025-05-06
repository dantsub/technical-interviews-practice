import { useEffect, useState } from "react";
import useCounter from "../hooks/useCounter";
import styles from "../Checkout.module.css";

const Product = ({ id, name, availableCount, price, updateSummary }) => {
  const [total, setTotal] = useState(0);
  const { increase, decrease, counter: orderedQuantity } = useCounter();

  useEffect(() => {
    setTotal(orderedQuantity * price);
  }, [orderedQuantity, price]);

  useEffect(() => {
    updateSummary(id - 1, total)
  }, [total]);

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>
      <td>${total.toFixed(2)}</td>
      <td>
        <button
          className={styles.actionButton}
          disabled={orderedQuantity === availableCount}
          onClick={() => increase(1, availableCount)}
        >
          +
        </button>
        <button
          disabled={!orderedQuantity}
          className={styles.actionButton}
          onClick={() => decrease(1)}
        >
          -
        </button>
      </td>
    </tr>
  );
};

export default Product;
