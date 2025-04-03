import { useEffect, useState } from "react";
import { Container, Header, Title, SearchInput, Table, ActionIcon, AddButton } from "./styles";
import { FiTrash2, FiFileText, FiPlus, FiSearch } from "react-icons/fi";

interface Processo {
  id: string;
  nome: string;
}

export default function ProcessosPage() {
  const [processos, setProcessos] = useState<Processo[]>([]);

  useEffect(() => {
    setProcessos([
      { id: "1", nome: "Processo 1" },
      { id: "2", nome: "Processo 2" },
      { id: "3", nome: "Processo 3" },
      { id: "4", nome: "Processo 4" },
      { id: "5", nome: "Processo 5" },
      { id: "6", nome: "Processo 6" },
      { id: "7", nome: "Processo 7" },
      { id: "8", nome: "Processo 8" },
      { id: "9", nome: "Processo 9" },
    ]);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Processos</Title>
        <div style={{ position: "relative", width: "300px" }}>
          <FiSearch style={{ position: "absolute", top: "12px", left: "10px", color: "#aaa" }} />
          <SearchInput placeholder="Buscar" />
        </div>
      </Header>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th style={{ textAlign: "right" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td style={{ textAlign: "right" }}>
                <ActionIcon onClick={() => alert(`Excluir ${p.nome}`)}>
                  <FiTrash2 />
                </ActionIcon>
                <ActionIcon onClick={() => alert(`Visualizar ${p.nome}`)} gray>
                  <FiFileText />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddButton onClick={() => alert("Novo processo")}>
        <FiPlus />
      </AddButton>
    </Container>
  );
}
