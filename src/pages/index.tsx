import { Button } from "../components/Button";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => alert(" Sistema testado!")}>Testar sistema</Button>
    </div>
  );
}