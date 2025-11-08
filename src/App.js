import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Pets from "./pages/pets";
import Adicionar from "./pages/cadastro";
import Perfil from "./pages/perfilpets";
import Agenda from "./pages/agenda";
import Emergencias from "./pages/contatos";
import Configuracoes from "./pages/configuracao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/cadastro" element={<Adicionar />} />
        <Route path="/pets/:id" element={<Perfil />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/contatos" element={<Emergencias />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
