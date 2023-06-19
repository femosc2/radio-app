"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getChannel, getEpisodes, getPrograms } from "@/app/Utils/http";
import { IChannel, IEpisode } from "@/app/Types/types";
import ChannelHeader from "../../components/Header";
import Back from "../../components/Back";
import { getDate } from "@/app/Utils/regex";

export default function Episode({ params }: { params: { id: string } }) {
  const [input, setInput] = useState("");
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [channel, setChannel] = useState<IChannel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episodesData = await getEpisodes(Number(params.id));
        const channelData = await getChannel();
        setEpisodes(episodesData);
        setChannel(channelData);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const filteredEpisodes = episodes.filter((episode) => {
    const { title, publishdateutc } = episode;
    console.log("____");
    console.log(episode.title);
    console.log(new Date(getDate(publishdateutc)));
    console.log("____");
    if (input) {
      const lowercaseFilterText = input.toLowerCase();
      return (
        title.toLowerCase().includes(lowercaseFilterText) ||
        getDate(publishdateutc) > Date.parse(lowercaseFilterText)
      );
    }
    return true;
  });

  const sortedEpisodes = filteredEpisodes.sort((a, b) => {
    if (input) {
      return a.title.localeCompare(b.title);
    }
    return (
      new Date(getDate(a.publishdateutc)).getTime() -
      new Date(getDate(b.publishdateutc)).getTime()
    );
  });

  return (
    <section className="container mx-auto">
      <ChannelHeader tagline={channel?.tagline} image={channel?.image} />
      <Back href={"Channel"} />
      <main>
        <div className="flex justify-end mt-4">
          <input
            type="text"
            placeholder="Filter episodes by title or date"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-gray-400 rounded-md focus:outline-none focus:border-pink-500 border-1 border-gray-200 border-solid"
          />
        </div>
        <ul className="mt-8 space-y-4">
          {sortedEpisodes.map((episode) => (
            <li key={episode.id}>
              <p className="flex items-center space-x-4">
                <img
                  src={episode.imageurl}
                  alt={episode.title}
                  className="w-40 h-40"
                />
                <div>
                  <h2 className="text-xl text-white">{episode.title}</h2>
                  <p className="text-gray-400">{episode.description}</p>
                  {episode.listenpodfile && (
                    <audio src={episode.listenpodfile.url} controls />
                  )}
                </div>
              </p>
              <hr className="h-px my-8 bg-gray-100 border-0 dark:bg-gray-800" />
            </li>
          ))}
        </ul>
      </main>
      <footer className="mt-8">
        <Back href={"Channel"} />
      </footer>
    </section>
  );
}
