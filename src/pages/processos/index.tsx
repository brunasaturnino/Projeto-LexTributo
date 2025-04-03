import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Header, Title, SearchInput, Table, ActionIcon, AddButton } from "./styles";
import { FiTrash2, FiEdit2, FiPlus, FiSearch } from "react-icons/fi";

interface Processo {
  id: string;
  nome: string;
}

export default function ProcessosPage() {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const router = useRouter();

  useEffect(() => {
    setProcessos([
      { id: "1", nome: "Processo 1" },
      { id: "2", nome: "Processo 2" },
      { id: "3", nome: "Processo 3" },
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
              <td onClick={() => router.push(`/processos/${p.id}`)} style={{ cursor: "pointer",fontWeight: 500 }}>{p.nome}</td>
              <td style={{ textAlign: "right" }}>
                <ActionIcon onClick={() => alert(`Excluir ${p.nome}`)}>
                  <FiTrash2 />
                </ActionIcon>
                <ActionIcon onClick={() => router.push(`/processos/${p.id}/editar`)} gray>
                   <FiEdit2 />
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
