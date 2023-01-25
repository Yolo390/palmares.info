import { redirect } from "next/navigation";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import SignIn from "@/components/auth/SignIn";

const Signin = async () => {
  const session = await unstable_getServerSession(authOptions);

  // If already connected, can not access to `/signin`.
  if (session) redirect("/dashboard");

  return (
    <main className="flex flex-col justify-center items-center h-full">
      <SignIn />
    </main>
  );
};

export default Signin;
