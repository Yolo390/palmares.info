import Link from "next/link";

import { Button } from "@/components/ui/Button";

const Home = () => {
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
