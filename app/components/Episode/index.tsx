import { IEpisode } from "@/app/Types/types";
import Image from "next/image";

interface IProps {
  episode: IEpisode;
}

const Episode = (props: IProps) => {
  const { episode } = props;
  return (
    <li key={episode.id}>
      <article className="flex flex-col space-x-4 lg:flex-row">
        <Image
          src={episode.imageurl}
          alt={episode.title}
          className="w-24 h-24 mb-8 ml-4"
          width={96}
          height={96}
          loading="lazy"
        />
        <div className="flex justify-evenly space-y-5 flex-col">
          <h2 className="text-xl text-white">{episode.title}</h2>
          <p className="text-gray-400">{episode.description}</p>
          {episode.listenpodfile && (
            <audio
              src={episode.listenpodfile.url}
              controls
              className="w-full"
            />
          )}
        </div>
      </article>
      <hr className="h-px my-8 bg-gray-100 border-0 dark:bg-gray-800" />
    </li>
  );
};

export default Episode;
