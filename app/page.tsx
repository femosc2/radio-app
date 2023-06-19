import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl text-pink-500">Radio App</h1>
      <Link href="/Channel">
        <button className="mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-2xl">
          Get Started
        </button>
      </Link>
    </section>
  );
}
