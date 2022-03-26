import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../redux/productsSlice";
import { useProductsListener } from "../config/firebase";

export default function Home() {
  useProductsListener();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(addProduct());
        }}
      >
        +
      </button>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <button
            onClick={() => {
              dispatch(deleteProduct(product.id));
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}
