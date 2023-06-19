import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getChannel, getPrograms } from "../Utils/http";
import Image from "next/image";
import ChannelHeader from "./components/Header";
import Back from "./components/Back";

const Channel: React.FC = async () => {
  const channel = await getChannel();
  const programs = await getPrograms();

  return (
    <section className="container mx-auto">
      <ChannelHeader tagline={channel?.tagline} image={channel?.image} />
      <Back href={""} />
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
              <hr className="h-px my-8 bg-gray-100 border-0 dark:bg-gray-800" />
            </li>
          ))}
        </ul>
        <Back href={"Channel"} />
      </main>
    </section>
  );
};

export default Channel;
