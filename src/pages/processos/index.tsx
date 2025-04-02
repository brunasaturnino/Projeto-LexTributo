import { useEffect, useState } from "react";
import { Container, Title, Table, ActionButton } from "./styles";

interface Processo {
  id: string;
  numero: string;
  autor: string;
  reu: string;
  tribunal: string;
  status: string;
}

export default function ProcessosPage() {
  const [processos, setProcessos] = useState<Processo[]>([]);

  useEffect(() => {
    setProcessos([
      {
        id: "1",
        numero: "0001234-56.2023.8.26.0000",
        autor: "Empresa X",
        reu: "Fazenda Pública",
        tribunal: "TJ-SP",
        status: "Em andamento",
      },
      {
        id: "2",
        numero: "0007890-12.2024.4.01.0000",
        autor: "João da Silva",
        reu: "União Federal",
        tribunal: "TRF-1",
        status: "Arquivado",
      },
    ]);
  }, []);

  return (
    <Container>
      <Title>Meus Processos</Title>
      <Table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Autor</th>
            <th>Réu</th>
            <th>Tribunal</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map((p) => (
            <tr key={p.id}>
              <td>{p.numero}</td>
              <td>{p.autor}</td>
              <td>{p.reu}</td>
              <td>{p.tribunal}</td>
              <td>{p.status}</td>
              <td>
                <ActionButton
                  $variant="primary"
                  onClick={() => alert(`Visualizar ${p.numero}`)}
                >
                  Visualizar
                </ActionButton>

                <ActionButton
                  $variant="success"
                  onClick={() => alert(`Compartilhar ${p.numero}`)}
                >
                  Compartilhar
                </ActionButton>

                <ActionButton
                  $variant="danger"
                  onClick={() => alert(`Excluir ${p.numero}`)}
                >
                  Excluir
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
