"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita reload da página
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/entrar");
        },
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Button className="w-40" variant="laranja" type="submit">
        Sair
      </Button>
    </form>
  );
}
