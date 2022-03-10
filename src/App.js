import { Provider } from "react-redux";
import { store } from "./redux";
import Router from "./config/router";

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
