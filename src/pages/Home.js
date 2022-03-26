import {
  useProductsLister,
  deleteProduct,
  addProduct,
} from "../config/firebase";

export default function Home() {
  const products = useProductsLister();

  return (
    <div>
      <button
        onClick={() => {
          addProduct();
        }}
      >
        +
      </button>
      {products.map((product) => (
        <div>
          <h2>{product.name}</h2>
          <button
            onClick={() => {
              deleteProduct(product.id);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}
