import Home from "./Components/Home";
import AddNpm from "./Components/AddNpm";
import Operation from "./Components/Operation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="AddNpm" element={<AddNpm />} />
        <Route path="/operation" element={<Operation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
