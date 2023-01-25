"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/Button";

const SignIn = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <main className="flex flex-col justify-center items-center h-full">
      <h1>SIGN IN</h1>

      <div className="mt-16">
        <Button
          variant="outline"
          onClick={() => signIn("google", { callbackUrl })}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login with Google
        </Button>
      </div>
    </main>
  );
};

export default SignIn;
