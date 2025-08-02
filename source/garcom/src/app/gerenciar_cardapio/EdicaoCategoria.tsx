import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DadosEdicao } from "./types";

interface EdicaoCategoriaProps {
  dadosEdicao: DadosEdicao;
  setDadosEdicao: (dados: DadosEdicao) => void;
  carregando: boolean;
  onSalvar: () => void;
  onCancelar: () => void;
}

export function EdicaoCategoria({
  dadosEdicao,
  setDadosEdicao,
  carregando,
  onSalvar,
  onCancelar,
}: EdicaoCategoriaProps) {
  return (
    <div className="flex items-center gap-3">
      <Input
        value={dadosEdicao.nome}
        onChange={(e) =>
          setDadosEdicao({ ...dadosEdicao, nome: e.target.value })
        }
        placeholder="Nome da categoria"
        disabled={carregando}
        className="flex-1"
      />
      
      <div className="flex gap-2">
        <Button
          onClick={onSalvar}
          disabled={carregando || !dadosEdicao.nome.trim()}
          size="sm"
          className="bg-red-500 hover:bg-red-600"
        >
          {carregando ? "Salvando..." : "Salvar"}
        </Button>
        <Button
          variant="outline"
          onClick={onCancelar}
          disabled={carregando}
          size="sm"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
