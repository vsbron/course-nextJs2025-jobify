import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import LandingImg from "@/assets/main.svg";
import Logo from "@/assets/logo.svg";

function Home() {
  // Returned JSX
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="Jobify" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr_400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            ratione, labore quisquam itaque, explicabo corporis iste consectetur
            consequuntur dolorum rem delectus deleniti voluptas qui quas dicta
            illo amet reprehenderit! Temporibus?
          </p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/add-job">Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="landing" className="hidden lg:block" />
      </section>
    </main>
  );
}

export default Home;
