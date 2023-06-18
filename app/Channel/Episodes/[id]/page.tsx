import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getChannel, getEpisodes, getPrograms } from "@/app/Utils/http";
import { IChannel, IEpisode } from "@/app/Types/types";

export default async function Episode({ params }: { params: { id: string } }) {
  const episodes = await getEpisodes(Number(params.id));
  const channel = await getChannel();
  console.log(params.id);

  return (
    <section className="container mx-auto">
      <header>
        <img src={channel.image} alt="Channel Image" className="w-24 h-24" />
        <h1 className="text-3xl mt-4">{channel.tagline}</h1>
        <Link href="/Channel">
          <p className="text-pink-500 hover:underline">Go back to Programs</p>
        </Link>
      </header>
      <main>
        <ul className="mt-8 space-y-4">
          {episodes.map((episode) => (
            <li key={episode.id}>
              <p className="flex items-center space-x-4">
                <img
                  src={episode.imageurl}
                  alt={episode.title}
                  className="w-16 h-16"
                />
                <div>
                  <h2 className="text-xl">{episode.title}</h2>
                  <p className="text-gray-500">{episode.description}</p>
                  {episode.listenpodfile && (
                    <audio src={episode.listenpodfile.url} controls />
                  )}
                </div>
              </p>
            </li>
          ))}
        </ul>
      </main>
      <footer className="mt-8">
        {params.id}
        <Link href="/Channel">
          <p className="text-pink-500 hover:underline">Go back to Programs</p>
        </Link>
      </footer>
    </section>
  );
}
