import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCurrentUser } from '../../../services/auth';
import { getProcessById } from '../../../services/process';
import { getDocumentsByProcessId } from '../../../services/document';
import {
  Container,
  Title,
  Card,
  InfoRow,
  Label,
  Header,
  Value,
  SectionTitle,
  DocumentList,
  DocumentItem,
  DocumentIcon,
} from '../styles'; 
import { FiArrowLeft } from 'react-icons/fi';
import { Process } from '../../../types/Process';
import {  Document } from '../../../types/Document';


export default function DetalhesProcesso() {
  const router = useRouter();
  const { id } = router.query;

  const [processo, setProcesso] = useState<Process | null>(null);
  const [documentos, setDocumentos] = useState<Document[]>([]);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        // verifica autenticação
        // busca dados do processo
        const proc = await getProcessById(id as string);
        setProcesso(proc);
        // busca documentos vinculados
        const docs = await getDocumentsByProcessId(id as string);
        setDocumentos(docs);
      } catch (err) {
        router.push('/login');
      }
    })();
  }, [id]);

  if (!processo) {
    return <p style={{ padding: '2rem' }}>Carregando detalhes do processo...</p>;
  }

  return (
    <Container>
      <Header>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          title="Voltar"
        >
          <FiArrowLeft size={22} color="#e60000" />
        </button>
        <Title>Detalhes do Processo</Title>
      </Header>

      <Card>
        <SectionTitle>Informações do Processo</SectionTitle>

        <InfoRow>
          <Label>Número:</Label>
          <Value>{processo.numeroProcesso}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Autor:</Label>
          <Value>{processo.autor}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Reu:</Label>
          <Value>{processo.reu}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Tribunal:</Label>
          <Value>{processo.tribunal}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Status:</Label>
          <Value>
            {processo.status === 'aberto'
              ? 'Aberto'
              : processo.status === 'em_andamento'
              ? 'Em andamento'
              : 'Concluído'}
          </Value>
        </InfoRow>
      </Card>

      <Card>
        <SectionTitle>Documentos</SectionTitle>
        {documentos.length > 0 ? (
          <DocumentList>
            {documentos.map((doc, idx) => (
              <DocumentItem key={idx}>
                <DocumentIcon size={18} />
                <a href={doc.caminhoArquivo} target="_blank" rel="noopener noreferrer">
                  {doc.nomeArquivo}
                </a>
              </DocumentItem>
            ))}
          </DocumentList>
        ) : (
          <p style={{ padding: '1rem', color: '#666' }}>
            Nenhum documento disponível.
          </p>
        )}
      </Card>
    </Container>
  );
}
