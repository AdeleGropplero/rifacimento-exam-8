import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHome from "./components/MyHome";
import Details from "./components/Details";
/* import MySearch from "./components/MySearch"; */

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/details/:lat/:lon/:name/:state" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
