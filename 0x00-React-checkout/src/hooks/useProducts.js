import { useEffect, useState } from "react";
import { getProducts } from "../dataService";

const useProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts(products)
        setPrices(Array.from({ length: products.length }, () => 0))
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const modifyPrice = (idx, value) => {
    setPrices((prev) => {
      const newPrices = [...prev];
      newPrices[idx] = value;
      return newPrices
    })
  }

  return { isLoading, error, products, modifyPrice, prices };
};

export default useProducts;
