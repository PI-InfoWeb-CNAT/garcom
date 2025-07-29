import { auth } from "@/lib/auth";
import { headers } from "next/headers";


interface DadosUsuario {
  session: any;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
  role: string;
  roleData: any;
}
export async function getDados(): Promise<DadosUsuario | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  if (!session?.user?.id || !baseUrl) return null;

  try {
    const userRes = await fetch(`${baseUrl}/api/user?id=${session.user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!userRes.ok) return null;

    const user = await userRes.json();
    let roleData = null;

    if (user.role === "restaurante") {
      const res = await fetch(`${baseUrl}/api/restaurante?user_id=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) roleData = await res.json();
    } else if (user.role === "funcionario") {
      const res = await fetch(`${baseUrl}/api/funcionario?user_id=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) roleData = await res.json();
    }

    return {
      session,
      user,
      role: user.role,
      roleData,
    };
  } catch (e) {
    console.error("Erro ao buscar dados do usuário:", e);
    return null;
  }
}
