import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProcessById, updateProcess } from "../../../services/process";
import { fetchCurrentUser } from "../../../services/auth";
import { Button } from "../../../components/Button";
import {
  Container,
  Title,
  Card,
  InfoRow,
  Label,
  Header,
  DocumentButton,
} from "../styles"; 
import {
  FiFilePlus,
  FiFileText,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";
import { Process } from "../../../types/Process";

export default function EditarProcesso() {
  const router = useRouter();
  const { id } = router.query;

  const [processo, setProcesso] = useState<Process | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (typeof id === "string") {
          const data = await getProcessById(id);
          setProcesso(data);
        }
      } catch {
        router.push("/login");
      }
    })();
  }, [id]);
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!processo) return;
    setProcesso({ ...processo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!processo) return;
    setLoading(true);
    try {
      await updateProcess(processo.id, {
        Status: processo.status
      });
      router.push(`/processos`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!processo) return <p style={{ padding: "2rem" }}>Carregando...</p>;

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
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
      </div>
  
   

      <form onSubmit={handleSubmit}>
        <Card>
        <InfoRow>
      <Label>Status:</Label>
      <select
        name="status"
        value={processo.status}
        onChange={handleChange}
        style={inputStyle}
        required
      >
        <option value="aberto">Aberto</option>
        <option value="em_andamento">Em andamento</option>
        <option value="concluido">Concluído</option>
      </select>
    </InfoRow>

    <button type="submit" style={buttonStyle} disabled={loading}>
      {loading ? "Salvando..." : "Salvar"}
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
