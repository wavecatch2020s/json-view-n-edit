import Navbar from "./components/Navbar";
import "./styles/app.scss";
import MainDisplay from "./components/MainDisplay";
import dummyJSON from "./dummyJSON.json";
import { useDispatch } from "react-redux";
import { dataActions } from "./store/data-slice";

function App() {
  const dispatch = useDispatch();

  dispatch(dataActions.loadJsonData(dummyJSON));

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <MainDisplay />
      </main>
    </div>
  );
}

export default App;
