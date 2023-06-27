import "./assets/css/tailwind.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ColorPicker from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateColor from "./pages/GenerateColor";
import SaveColor from "./pages/SaveColor";
import DetailsPge from "./pages/DetailsPge";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ColorPicker />} />
          <Route path="generate" element={<GenerateColor />} />
          <Route path="save" element={<SaveColor />} />
          <Route path="savecolordetails/:colorcode" element={<DetailsPge />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
