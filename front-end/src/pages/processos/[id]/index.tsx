import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Title, Card, InfoRow, Label, Header, Value, DocumentButton, CardDocumentRow} from "../styles";
import { FiFilePlus } from "react-icons/fi";



interface Processo {
  id: string;
  nome: string;
  autor: string;
  reu: string;
  tribunal: string;
  status: string;
}

export default function DetalhesProcesso() {
  const router = useRouter();
  const { id } = router.query;

  const [processo, setProcesso] = useState<Processo | null>(null);

  useEffect(() => {
    if (!id) return;

    const listaDeProcessos: Processo[] = [
      {
        id: "1",
        nome: "Processo 1",
        autor: "Empresa X",
        reu: "Fazenda Pública",
        tribunal: "TJ-SP",
        status: "Em andamento",
      },
      {
        id: "2",
        nome: "Processo 2",
        autor: "João da Silva",
        reu: "União Federal",
        tribunal: "TRF-1",
        status: "Concluído",
      },
      {
        id: "3",
        nome: "Processo 3",
        autor: "Maria Oliveira",
        reu: "Estado de Minas Gerais",
        tribunal: "TJ-MG",
        status: "Pendente",
      },
      {
        id: "4",
        nome: "Processo 4",
        autor: "Empresa Z",
        reu: "Fazenda Pública",
        tribunal: "TJ-RS",
        status: "Arquivado",
      },
    ];

    const encontrado = listaDeProcessos.find((p) => p.id === id);
    setProcesso(encontrado || null);
  }, [id]);

  if (!processo) {
    return <p style={{ padding: "2rem" }}>Carregando processo...</p>;
  }

  return (
    <Container>
            <Header>
      <Title>Detalhes do Processo</Title>
            </Header>
      <Card>
        <InfoRow>
          <Label>ID:</Label>
          <Value>{processo.id}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Nome:</Label>
          <Value>{processo.nome}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Autor:</Label>
          <Value>{processo.autor}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Réu:</Label>
          <Value>{processo.reu}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Tribunal:</Label>
          <Value>{processo.tribunal}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Status:</Label>
          <Value>{processo.status}</Value>
        </InfoRow>
        <CardDocumentRow>
          <DocumentButton onClick={() => alert("Adicionar documentos ao processo")}>
            <FiFilePlus size={20} />
          </DocumentButton>
        </CardDocumentRow>
      </Card>
    </Container>
  );
}
