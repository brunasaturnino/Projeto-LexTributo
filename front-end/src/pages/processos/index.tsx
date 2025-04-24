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
  StatusFilter,
  StatusOption,
  CardLogout
} from "./styles";
import {
  FiTrash2,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";

interface Processo {
  id: string;
  nome: string;
  status: string;
}

export default function ProcessosPage() {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [busca, setBusca] = useState("");
  const [colunaOrdenada, setColunaOrdenada] = useState<"nome">("nome"); // agora só nome
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>(""); // "" = todos
  const router = useRouter();

  useEffect(() => {
    setProcessos([
      { id: "1", nome: "Processo 1", status: "Em andamento" },
      { id: "2", nome: "Processo 2", status: "Concluído" },
      { id: "3", nome: "Processo 3", status: "Pendente" },
      { id: "4", nome: "Processo 4", status: "Arquivado" },
    ]);
  }, []);

  // Ordenação apenas por nome
  const handleOrdenarNome = () => {
    setOrdemAscendente(!ordemAscendente);
  };

  const processosFiltrados = processos
    // filtrar por nome
    .filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
    // filtrar por status
    .filter(p => !filtroStatus || p.status === filtroStatus)
    // ordenar por nome
    .sort((a, b) =>
      ordemAscendente
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome)
    );

  const todosStatuses = ["", "Em andamento", "Pendente", "Concluído", "Arquivado"];

  function handleLogout() {
    // Exemplo simples: limpe tokens/sessão aqui se usar autenticação real
    // localStorage.removeItem('token');
    // window.location.href = "/login";
    router.push("/login"); // só para simular logout agora
  }


  return (
    <Container>
      <Header>
        <Title>Processos</Title>
        <CardLogout onClick={handleLogout}>
          <FiLogOut size={15} />
          LogOut
        </CardLogout>
      </Header>

      <CardWrapper>
        <TableHeaderRow>
          <SearchWrapper>
            <FiSearch
              style={{ position: "absolute", top: 12, left: 10, color: "#aaa" }}
            />
            <SearchInput
              placeholder="Buscar"
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </SearchWrapper>
          <AddButton onClick={() => alert("Novo processo")}>
            <FiPlus />
          </AddButton>
        </TableHeaderRow>

        {/* filtro por status */}
        <StatusFilter>
          {todosStatuses.map(status => (
            <StatusOption
              key={status || "todos"}
              active={filtroStatus === status}
              onClick={() => setFiltroStatus(status)}
            >
              {status || "Todos"}
            </StatusOption>
          ))}
        </StatusFilter>

        <Table>
          <thead>
            <tr>
              <th>
                <SortButton onClick={handleOrdenarNome}>
                  Nome {ordemAscendente ? <FiChevronUp /> : <FiChevronDown />}
                </SortButton>
              </th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processosFiltrados.map(p => (
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
