import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Header,
  Title,
  SearchInput,
  Table,
  ActionIcon,
  AddButton,
  SortButton,
  SearchWrapper,
  CardWrapper,
  TableHeaderRow,
} from "./styles";
import {
  FiTrash2,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";

interface Processo {
  id: string;
  nome: string;
  status: string;
}

export default function ProcessosPage() {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [busca, setBusca] = useState("");
  const [colunaOrdenada, setColunaOrdenada] = useState<"nome" | "status">("nome");
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setProcessos([
      { id: "1", nome: "Processo 1", status: "Em andamento" },
      { id: "2", nome: "Processo 2", status: "Concluído" },
      { id: "3", nome: "Processo 3", status: "Pendente" },
      { id: "4", nome: "Processo 4", status: "Arquivado" },

    ]);
  }, []);

  const handleOrdenar = (coluna: "nome" | "status") => {
    if (colunaOrdenada === coluna) {
      setOrdemAscendente(!ordemAscendente);
    } else {
      setColunaOrdenada(coluna);
      setOrdemAscendente(true); // começa crescente na nova coluna
    }
  };

  const processosFiltrados = processos
    .filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      if (colunaOrdenada === "nome") {
        return ordemAscendente
          ? a.nome.localeCompare(b.nome)
          : b.nome.localeCompare(a.nome);
      } else {
        const prioridade: Record<string, number> = {
          "Concluído": 3,
          "Em andamento": 1,
          "Pendente": 2,
          "Arquivado" : 4,
        };
    
        const valorA = prioridade[a.status] ?? 99;
        const valorB = prioridade[b.status] ?? 99;
    
        return ordemAscendente ? valorA - valorB : valorB - valorA;
      }
    });

  return (
    <Container>
      <Header>
        <Title>Processos</Title>
      </Header>

      <CardWrapper>
        <TableHeaderRow>
          <SearchWrapper>
            <FiSearch
              style={{
                position: "absolute",
                top: "12px",
                left: "10px",
                color: "#aaa",
              }}
            />
            <SearchInput
              placeholder="Buscar"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </SearchWrapper>

          <AddButton onClick={() => alert("Novo processo")}>
            <FiPlus />
          </AddButton>
        </TableHeaderRow>

        <Table>
          <thead>
            <tr>
              <th>
                <SortButton onClick={() => handleOrdenar("nome")}>
                  Nome{" "}
                  {colunaOrdenada === "nome" &&
                    (ordemAscendente ? <FiChevronUp /> : <FiChevronDown />)}
                </SortButton>
              </th>
              <th>
                <SortButton onClick={() => handleOrdenar("status")}>
                  Status{" "}
                  {colunaOrdenada === "status" &&
                    (ordemAscendente ? <FiChevronUp /> : <FiChevronDown />)}
                </SortButton>
              </th>
              <th style={{ textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processosFiltrados.map((p) => (
              <tr key={p.id}>
                <td
                  onClick={() => router.push(`/processos/${p.id}`)}
                  style={{ cursor: "pointer", fontWeight: 500 }}
                >
                  {p.nome}
                </td>
                <td>{p.status}</td>
                <td style={{ textAlign: "right" }}>
                  <ActionIcon onClick={() => alert(`Excluir ${p.nome}`)}>
                    <FiTrash2 />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => router.push(`/processos/${p.id}/editar`)}
                    gray
                  >
                    <FiEdit2 />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardWrapper>
    </Container>
  );
}
