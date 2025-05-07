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
import { fetchCurrentUser, getCurrentUserId } from "../../services/auth";
import { Process } from "../../types/Process";
import { jwtDecode } from "jwt-decode";

export default function ProcessosPage() {
  const [processos, setProcessos] = useState<Process[]>([]);
  const [busca, setBusca] = useState("");
  const [ordemAsc, setOrdemAsc] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // Busca os processos do usuário
        const lista = await getProcesses();
        if (lista){
          setProcessos(lista);
        }
      } catch (err: any) {
        // Se não estiver logado ou der erro de API, manda pro login
        console.log(err.response.data)
      }
    })();
  }, []);

  const filtered = processos
    .filter(p => p.nome?.toLowerCase().includes(busca.toLowerCase()))
    .filter(p => !filtroStatus || p.status === filtroStatus)
    .sort((a, b) =>
      ordemAsc
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome)
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
                  Número do Processo {ordemAsc ? <FiChevronUp /> : <FiChevronDown />}
                </SortButton>
              </th>
              <th>Autor</th>
              <th>Réu</th>
              <th>Tribunal</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processos.map(p => (
              <tr key={p.id}>
                <td
                  onClick={() => router.push(`/processos/${p.id}`)}
                  style={{ cursor: "pointer", fontWeight: 500 }}
                >
                  {p.numeroProcesso}
                </td>
                <td>{p.autor}</td>
                <td>{p.reu}</td>
                <td>{p.tribunal}</td>
                <td>
                  {p.status === "aberto"
                    ? "Aberto"
                    : p.status === "em_andamento"
                    ? "Em andamento"
                    : "Concluído"}
                </td>
                <td style={{ textAlign: "right" }}>
                  <ActionIcon
                    onClick={async () => {
                      if (
                        window.confirm(
                          `Excluir o processo “${p.numeroProcesso}”?`
                        )
                      ) {
                        await deleteProcess(p.id);
                        setProcessos(prev =>
                          prev.filter(x => x.id !== p.id)
                        );
                      }
                    }}
                  >
                    <FiTrash2 />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() =>
                      router.push(`/processos/${p.id}/editar`)
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
