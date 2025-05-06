// front-end/src/pages/processos/index.tsx

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
  CardLogout,
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
import { getProcesses, deleteProcess } from "../../services/process";
import { fetchCurrentUser } from "../../services/auth";
import { Process } from "../../types/Process";

export default function ProcessosPage() {
  const [processos, setProcessos] = useState<Process[]>([]);
  const [busca, setBusca] = useState("");
  const [ordemAsc, setOrdemAsc] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // Garante que o token é válido e temos um usuário logado
        await fetchCurrentUser();
        // Busca os processos do usuário
        const lista = await getProcesses();
        setProcessos(lista);
      } catch (err) {
        // Se não estiver logado ou der erro de API, manda pro login
        router.push("/login");
      }
    })();
  }, []);

  const filtered = processos
    .filter(p => p.Titulo.toLowerCase().includes(busca.toLowerCase()))
    .filter(p => !filtroStatus || p.Status === filtroStatus)
    .sort((a, b) =>
      ordemAsc
        ? a.Titulo.localeCompare(b.Titulo)
        : b.Titulo.localeCompare(a.Titulo)
    );

  const allStatuses = ["", "aberto", "em_andamento", "concluido"];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Container>
      <Header>
        <Title>Processos</Title>
        <CardLogout onClick={handleLogout}>
          <FiLogOut size={15} /> Logout
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
          <AddButton onClick={() => router.push("/processos/novo")}>
            <FiPlus />
          </AddButton>
        </TableHeaderRow>

        <StatusFilter>
          {allStatuses.map(status => (
            <StatusOption
              key={status || "todos"}
              active={filtroStatus === status}
              onClick={() => setFiltroStatus(status)}
            >
              {status === ""
                ? "Todos"
                : status === "aberto"
                ? "Aberto"
                : status === "em_andamento"
                ? "Em andamento"
                : "Concluído"}
            </StatusOption>
          ))}
        </StatusFilter>

        <Table>
          <thead>
            <tr>
              <th>
                <SortButton onClick={() => setOrdemAsc(!ordemAsc)}>
                  Título {ordemAsc ? <FiChevronUp /> : <FiChevronDown />}
                </SortButton>
              </th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.Id}>
                <td
                  onClick={() => router.push(`/processos/${p.Id}`)}
                  style={{ cursor: "pointer", fontWeight: 500 }}
                >
                  {p.Titulo}
                </td>
                <td>
                  {p.Status === "aberto"
                    ? "Aberto"
                    : p.Status === "em_andamento"
                    ? "Em andamento"
                    : "Concluído"}
                </td>
                <td style={{ textAlign: "right" }}>
                  <ActionIcon
                    onClick={async () => {
                      if (
                        window.confirm(
                          `Excluir o processo “${p.Titulo}”?`
                        )
                      ) {
                        await deleteProcess(p.Id);
                        setProcessos(prev =>
                          prev.filter(x => x.Id !== p.Id)
                        );
                      }
                    }}
                  >
                    <FiTrash2 />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() =>
                      router.push(`/processos/${p.Id}/editar`)
                    }
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
