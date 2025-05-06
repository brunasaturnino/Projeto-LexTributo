import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  Container,
  Title,
  Card,
  InfoRow,
  Label,
  DocumentButton,
} from "./styles";
import { FiFilePlus, FiFileText, FiTrash2 } from "react-icons/fi";

interface Documento {
  file: File;
  url: string;
}

export default function NovoProcesso() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [autor, setAutor] = useState("");
  const [reu, setReu] = useState("");
  const [tribunal, setTribunal] = useState("");
  const [status, setStatus] = useState("Em andamento");
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddDocument = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const novosDocs = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setDocumentos((prev) => [...prev, ...novosDocs]);
    }
  };

  const handleExcluirDocumento = (index: number) => {
    setDocumentos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    const dadosProcesso = {
      nome,
      autor,
      reu,
      tribunal,
      status,
      documentos: documentos.map((doc) => doc.file.name),
    };

    console.log("Dados salvos:", dadosProcesso);
    alert(`Processo "${nome}" cadastrado com ${documentos.length} documento(s)!`);
    router.push("/processos");
  };

  return (
    <Container>
      <Title style={{ marginBottom: "1.5rem" }}>Cadastrar Novo Processo</Title>

      <form onSubmit={handleSalvar}>
        <Card>
          <InfoRow>
            <Label>Nome:</Label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={inputStyle}
              required
            />
          </InfoRow>

          <InfoRow>
            <Label>Autor:</Label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              style={inputStyle}
              required
            />
          </InfoRow>

          <InfoRow>
            <Label>Réu:</Label>
            <input
              type="text"
              value={reu}
              onChange={(e) => setReu(e.target.value)}
              style={inputStyle}
              required
            />
          </InfoRow>

          <InfoRow>
            <Label>Tribunal:</Label>
            <input
              type="text"
              value={tribunal}
              onChange={(e) => setTribunal(e.target.value)}
              style={inputStyle}
              required
            />
          </InfoRow>

          <InfoRow>
            <Label>Status:</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={inputStyle}
              required
            >
              <option>Em andamento</option>
              <option>Concluído</option>
              <option>Pendente</option>
              <option>Arquivado</option>
            </select>
          </InfoRow>

          <InfoRow style={{ alignItems: "flex-start" }}>
            <Label style={{ marginTop: "0.4rem" }}>Documentos:</Label>
            <div style={{ flex: 1 }}>
              <DocumentButton type="button" onClick={handleAddDocument}>
                <FiFilePlus size={20} />
              </DocumentButton>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />

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
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#2a3eb1", textDecoration: "none" }}
                      >
                        {doc.file.name}
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
                        title="Remover"
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
