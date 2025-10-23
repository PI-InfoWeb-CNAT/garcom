import { ChevronDown } from "lucide-react";

export function CardPedido() {
  return (
    <>
      <div className="mt-8 rounded-3xl bg-[#FFC300] px-6 py-4 text-black/65">
        <div className="flex items-center justify-between text-[14px]">
          <h4 className="text-[14px] font-semibold">Pedido #12345</h4>
          <p className="text-[14px]">15:57</p>
        </div>
        <div className="mb-1 flex items-center">
          <img
            className="h-[18px]"
            src="/chapeu_chef.svg"
            alt="Chapéu de Chef"
          />
          <h2 className="ml-1.5 font-semibold">Preparando</h2>
        </div>
        <hr className="border" />
        <div>
          <ul className="space-y-0.2 mt-4">
            <li className="flex items-center gap-5">
              <p>2 uni</p>
              <h4 className="">Pizza Margherita</h4>
            </li>
            <li className="flex items-center gap-5">
              <p>2 uni</p>
              <h4 className="">Pizza Margherita</h4>
            </li>
            <li className="flex items-center gap-5">
              <p>2 uni</p>
              <h4 className="">Pizza Margherita</h4>
            </li>
          </ul>
        </div>
        <div className="flex justify-end">
          <button className="bg-black/65 rounded-2xl">
            <ChevronDown className="text-[#FFC300]" />
          </button>
        </div>
      </div>
    </>
  );
}
