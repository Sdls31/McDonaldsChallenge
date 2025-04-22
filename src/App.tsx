import "./App.css";
import { init } from "./i18n/init";
import { Routes } from "./router/Routes";
import { BrowserRouter } from "react-router-dom";

init();
const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
