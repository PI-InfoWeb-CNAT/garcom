import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { DadosEdicaoItem, Categoria } from "../types";

interface EdicaoItemProps {
  dadosEdicao: DadosEdicaoItem;
  setDadosEdicao: (dados: DadosEdicaoItem) => void;
  categorias: Categoria[];
  carregando: boolean;
  onSalvar: () => void;
  onCancelar: () => void;
}

export function EdicaoItem({
  dadosEdicao,
  setDadosEdicao,
  categorias,
  carregando,
  onSalvar,
  onCancelar,
}: EdicaoItemProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setDadosEdicao({ ...dadosEdicao, foto: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar();
  };

  const selecionarCategoria = (categoriaId: string) => {
    setDadosEdicao({ ...dadosEdicao, categoria_id: categoriaId });
  };

  const isCategoriaSelected = (categoriaId: string) => {
    return dadosEdicao.categoria_id === categoriaId;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="mx-4 max-h-[95vh] w-[40%] max-w-xl overflow-y-auto">
        <section className="min-h-fit rounded-3xl border-1 border-[#F55774] bg-white p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#F55774]">
              Editar Item
            </h2>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="file"
                id="file-input-modal"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <label
                htmlFor="file-input-modal"
                className="absolute z-10 m-5 cursor-pointer rounded-full p-2 shadow-lg transition-shadow hover:shadow-xl"
              >
                <img
                  src={"/arquivo.svg"}
                  alt="Arquivo"
                  className="h-8 w-8"
                />
              </label>

              <img
                src={dadosEdicao.foto || "/default-banner.png"}
                alt="foto_item"
                className="h-50 w-full rounded-3xl object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-[#616161]">
                Nome do produto
              </h2>
              <Input
                type="text"
                placeholder="Nome do produto"
                value={dadosEdicao.nome}
                onChange={(e) => setDadosEdicao({ ...dadosEdicao, nome: e.target.value })}
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                disabled={carregando}
                required
              />
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-[#616161]">
                Descrição
              </h2>
              <Input
                type="text"
                placeholder="Descrição do produto"
                value={dadosEdicao.descricao || ""}
                onChange={(e) => setDadosEdicao({ ...dadosEdicao, descricao: e.target.value })}
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                disabled={carregando}
              />
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-[#616161]">
                Valor
              </h2>
              <Input
                type="text"
                placeholder="00,00"
                value={dadosEdicao.preco_unitario}
                onChange={(e) => setDadosEdicao({ ...dadosEdicao, preco_unitario: e.target.value })}
                className="rounded-4xl border-1 border-[#83546A] bg-[#EFEFEF] p-6 font-semibold text-[#9E9E9E]"
                disabled={carregando}
                required
              />
            </div>
            
            <div className="relative overflow-hidden">
              <h2 className="mb-3 text-lg font-semibold text-[#616161]">
                Categoria (selecione uma)
              </h2>
              <Carousel className="w-full max-w-full">
                <CarouselContent className="-ml-1">
                  {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                      <CarouselItem
                        key={categoria.id}
                        className="min-w-0 flex-shrink-0 basis-1/3 pl-1"
                      >
                        <button
                          type="button"
                          onClick={() => selecionarCategoria(categoria.id)}
                          disabled={carregando}
                          className={`w-full cursor-pointer rounded-3xl border-2 p-2 transition-all duration-200 ${
                            isCategoriaSelected(categoria.id)
                              ? "scale-100 transform border-transparent bg-[#FFE3CF] text-[#E55F4B]"
                              : "border-transparent bg-[#D9D9D9] text-gray-700 hover:border-gray-300 hover:bg-[#C0C0C0]"
                          } ${carregando ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex items-center justify-center">
                            <p className="text-sm font-medium">
                              {categoria.nome}
                            </p>
                          </div>
                        </button>
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="w-full py-4 text-center">
                      <p className="text-gray-500">
                        Nenhuma categoria encontrada
                      </p>
                    </div>
                  )}
                </CarouselContent>
              </Carousel>

              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/85 to-transparent"></div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={onCancelar}
                disabled={carregando}
                className="rounded-3xl bg-[#FFC300] p-6"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={carregando}
                className="rounded-3xl bg-[#E55F4B] p-6 pr-15 pl-15"
              >
                {carregando ? "Salvando..." : "Atualizar Produto"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
