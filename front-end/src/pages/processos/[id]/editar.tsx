import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import {
  Container,
  Title,
  Card,
  InfoRow,
  Label,
  Header,
  DocumentButton,
} from "../styles"; // ajuste o path conforme sua estrutura
import { FiFilePlus, FiFileText, FiTrash2, FiArrowLeft } from "react-icons/fi";

interface Processo {
  id: string;
  nome: string;
  autor: string;
  reu: string;
  tribunal: string;
  status: string;
}

interface Documento {
  nome: string;
  url: string;
  file: File;
}

export default function EditarProcesso() {
  const router = useRouter();
  const { id } = router.query;

  const [processo, setProcesso] = useState<Processo | null>(null);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    ];

    const encontrado = listaDeProcessos.find((p) => p.id === id);
    setProcesso(encontrado || null);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!processo) return;
    setProcesso({ ...processo, [e.target.name]: e.target.value });
  };

  const handleAddDocument = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const novosDocs = Array.from(files).map((file) => ({
        nome: file.name,
        url: URL.createObjectURL(file),
        file,
      }));
      setDocumentos((prev) => [...prev, ...novosDocs]);
    }
  };

  const handleExcluirDocumento = (index: number) => {
    setDocumentos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Processo atualizado:\n${JSON.stringify(processo, null, 2)}`);
    router.push(`/processos/${processo?.id}`);
  };

  if (!processo) return <p style={{ padding: "2rem" }}>Carregando...</p>;

  return (
    <Container>
        <Header style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
            title="Voltar"
          >
            <FiArrowLeft size={22} color="#e60000" />
          </button>
          <Title style={{ margin: 0 }}>Editar Processo</Title>
        </Header>

      <form onSubmit={handleSubmit}>
        <Card>
          <InfoRow>
            <Label>Nome:</Label>
            <input name="nome" value={processo.nome} onChange={handleChange} style={inputStyle} required />
          </InfoRow>

          <InfoRow>
            <Label>Autor:</Label>
            <input name="autor" value={processo.autor} onChange={handleChange} style={inputStyle} required />
          </InfoRow>

          <InfoRow>
            <Label>Réu:</Label>
            <input name="reu" value={processo.reu} onChange={handleChange} style={inputStyle} required />
          </InfoRow>

          <InfoRow>
            <Label>Tribunal:</Label>
            <input name="tribunal" value={processo.tribunal} onChange={handleChange} style={inputStyle} required />
          </InfoRow>

          <InfoRow>
            <Label>Status:</Label>
            <select name="status" value={processo.status} onChange={handleChange} style={inputStyle}>
              <option value="Em andamento">Em andamento</option>
              <option value="Pendente">Pendente</option>
              <option value="Concluído">Concluído</option>
              <option value="Arquivado">Arquivado</option>
            </select>
          </InfoRow>

          <InfoRow style={{ alignItems: "flex-start" }}>
            <Label style={{ marginTop: "0.4rem" }}>Documentos:</Label>
            <div style={{ flex: 1 }}>
              <DocumentButton type="button" onClick={handleAddDocument}>
                <FiFilePlus size={20} />
              </DocumentButton>
              <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} multiple />

              <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "1rem" }}>
                {documentos.length === 0 ? (
                  <li style={{ color: "#777" }}>Nenhum documento adicionado ainda.</li>
                ) : (
                  documentos.map((doc, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <FiFileText />
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ color: "#2a3eb1" }}>
                        {doc.nome}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleExcluirDocumento(index)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#e60000",
                          cursor: "pointer",
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </InfoRow>

          <button type="submit" style={buttonStyle}>
            Salvar
          </button>
        </Card>
      </form>
    </Container>
  );
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "0.5rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "2rem",
  padding: "0.7rem 1.5rem",
  backgroundColor: "#e60000",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const backButtonStyle: React.CSSProperties = {
  marginBottom: "1.5rem",
  padding: "0.5rem 1rem",
  backgroundColor: "#ccc",
  color: "#333",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
