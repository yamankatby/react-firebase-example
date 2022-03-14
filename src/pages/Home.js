import { useDispatch } from "react-redux";
import { logOut } from "../redux/authSlice";

export default function Home() {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogOut}>Sign Out</button>
    </div>
  );
}
