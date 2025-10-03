import { QRCodeSVG } from "qrcode.react";
import { Mesa } from "./types";

interface CardQRCodeProps {
  mesa: Mesa;
}

export function CardQRCode({ mesa }: CardQRCodeProps) {
  const urlPedido = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/perfil/cliente?mesa_id=${mesa.id}&restaurante_id=${mesa.restaurante_id}`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-[#2c2c2c]">
          Mesa {mesa.numero}
        </h3>

        <div className="rounded bg-white">  
          <QRCodeSVG
            value={urlPedido}
            size={180}
            level="M"
            includeMargin={true}
          />
        </div>
      </div>
    </div>
  );
}
