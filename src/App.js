import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { store } from "./redux";
import Router from "./config/router";

export default function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Router />
    </Provider>
  );
}
