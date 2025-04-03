import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Container, Title, Form, Label, Header, Input } from "../styles";

interface Processo {
  id: string;
  nome: string;
  autor: string;
  reu: string;
  tribunal: string;
  status: string;
}

export default function EditarProcesso() {
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
        status: "Arquivado",
      },
      {
        id: "3",
        nome: "Processo 3",
        autor: "Maria Oliveira",
        reu: "Estado de Minas Gerais",
        tribunal: "TJ-MG",
        status: "Concluído",
      },
    ];

    const encontrado = listaDeProcessos.find((p) => p.id === id);
    setProcesso(encontrado || null);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!processo) return;
    setProcesso({ ...processo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Processo atualizado: ${JSON.stringify(processo, null, 2)}`);
    router.push(`/processos/${processo?.id}`);
  };

  if (!processo) return <p style={{ padding: "2rem" }}>Carregando...</p>;

  return (
    <Container>
        <Header>
      <Title>Editar Processo</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>Nome:</Label>
        <Input name="nome" value={processo.nome} onChange={handleChange} />

        <Label>Autor:</Label>
        <Input name="autor" value={processo.autor} onChange={handleChange} />

        <Label>Réu:</Label>
        <Input name="reu" value={processo.reu} onChange={handleChange} />

        <Label>Tribunal:</Label>
        <Input name="tribunal" value={processo.tribunal} onChange={handleChange} />

        <Label>Status:</Label>
        <Input name="status" value={processo.status} onChange={handleChange} />

        <Button>Salvar Alterações</Button>
      </Form>
    </Container>
  );
}
