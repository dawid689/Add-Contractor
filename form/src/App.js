import { Route, Routes } from "react-router-dom";
import AddContractor from "./pages/AddContractorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AddContractor />} />
      </Routes>
    </div>
  );
}

export default App;
