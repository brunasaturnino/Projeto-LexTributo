import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/cadastro";
import ProcessosPage from "./pages/processos";
import Home from "./pages";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/processo" element={<ProcessosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
