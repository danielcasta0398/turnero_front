import "./App.css";
import "./index.css";
import Router from "./routes/Router";
import PorviderMain from "./providers/PorviderMain";

function App() {
  return (
    <PorviderMain>
      <Router />
    </PorviderMain>
  );
}

export default App;
