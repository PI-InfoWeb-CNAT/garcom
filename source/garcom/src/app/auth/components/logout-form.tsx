"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
    const router = useRouter();

    const onSubmit = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/entrar"); 
        },
      },
    });
  };
    return (
        <form action={onSubmit} method="POST">
            <Button className="w-40" variant="laranja" type="submit">
                Sair
        </Button>
        </form>
    );
}