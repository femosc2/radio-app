"use client";

import { useEffect, useState } from "react";
import { getChannel, getEpisodes, getPrograms } from "@/app/Utils/http";
import { IChannel, IEpisode } from "@/app/Types/types";
import ChannelHeader from "../../../components/Header";
import Back from "../../../components/Back";
import { getDate } from "@/app/Utils/regex";
import Episode from "../../../components/Episode";
import Loader from "../../../components/Loader";

export default function Episodes({ params }: { params: { id: string } }) {
  const [input, setInput] = useState("");
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [channel, setChannel] = useState<IChannel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingFailed(false);
      setIsLoading(true);
      try {
        const episodesData = await getEpisodes(Number(params.id));
        const channelData = await getChannel();
        setEpisodes(episodesData);
        setChannel(channelData);
      } catch (error) {
        setLoadingFailed(true);
        console.error("Error fetching episodes:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [params.id]);

  const filteredEpisodes = episodes.filter((episode) => {
    const { title, publishdateutc } = episode;
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
      {!isLoading && !loadingFailed ? (
        <>
          <ChannelHeader tagline={channel?.tagline} image={channel?.image} />
          <Back href={"Channel"} />
          <main>
            <div className="flex justify-end mt-4">
              <label htmlFor="input" className="sr-only">
                Filter
              </label>
              <input
                type="text"
                id="input"
                placeholder="Filter episodes by title or date"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 rounded-md focus:outline-none focus:border-pink-500 border-1 border-gray-200 border-solid"
              />
            </div>
            <ul className="mt-8 space-y-4">
              {sortedEpisodes.map((episode) => (
                <Episode key={episode.id} episode={episode} />
              ))}
            </ul>
          </main>
          <footer className="mt-8">
            <Back href={"Channel"} />
          </footer>
        </>
      ) : loadingFailed ? (
        <Loader />
      ) : (
        "Loading Failed"
      )}
    </section>
  );
}
