import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { Button } from "@/components/ui/Button";

const Home = async () => {
  const session = await getServerSession(authOptions);

  // If already connected, can not access to `/`.
  if (session) redirect("/admin/dashboard");

  return (
    <main>
      <div>Home page</div>
      <div>
        <Button variant="default">
          <Link href="/signin">Login</Link>
        </Button>
      </div>
    </main>
  );
};

export default Home;
