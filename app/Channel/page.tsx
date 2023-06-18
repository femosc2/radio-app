import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getChannel, getPrograms } from "../Utils/http";
import Image from "next/image";

const Channel: React.FC = async () => {
  const channel = await getChannel();
  const programs = await getPrograms();

  return channel && programs ? (
    <section className="container mx-auto">
      <header>
        <img src={channel.image} alt="Channel Image" className="w-24 h-24" />
        <h1 className="text-3xl mt-4">{channel.tagline}</h1>
      </header>
      <Link href="/">
        <p className="text-pink-500 hover:underline">Go back to Start</p>
      </Link>
      <main>
        <ul className="mt-8 space-y-4">
          {programs.map((program) => (
            <li key={program.id}>
              <Link href={`/Channel/Episodes/${program.id}`}>
                <div className="flex items-center space-x-4 cursor-pointer">
                  <img
                    src={program.programimage}
                    alt={program.name}
                    className="w-16 h-16"
                  />
                  <div>
                    <h2 className="text-xl">{program.name}</h2>
                    <p className="text-gray-500">{program.description}</p>
                  </div>
                </div>
              </Link>
              <hr />
            </li>
          ))}
        </ul>
      </main>
    </section>
  ) : (
    <p>Loading</p>
  );
};

export default Channel;
