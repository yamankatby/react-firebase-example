import { useEffect } from "react";
import { signIn } from "./config/firebase";

const App = () => {
  useEffect(() => {
    signIn("joe@mail.com", "1234567")
      .then(() => {
        console.log("Done");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <h1>Hi, App!</h1>;
};

export default App;
