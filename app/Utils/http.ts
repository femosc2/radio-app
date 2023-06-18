import { IChannel, IEpisode, IEpisodesResponse, IProgram } from "../Types/types";

export const getChannel = async (): Promise<IChannel> => {
    const response = await fetch('https://api.sr.se/api/v2/channels/132?format=json');
    const data = await response.json();
    return data.channel;
  };
  
  export const getPrograms = async (): Promise<IProgram[]> => {
    const response = await fetch('https://api.sr.se/api/v2/programs/index?format=json&filter=program.haspod&filtervalue=true&channelid=132');
    const data = await response.json();
    return data.programs;
  };

  export const getEpisodes = async (programId: number): Promise<IEpisode[]> => {
    const response = await fetch(
      `https://api.sr.se/api/v2/episodes/index?format=json&programid=${programId}`
    );
    const data: IEpisodesResponse = await response.json();
  
    // Process the data and return the episodes array
    const episodes = data.episodes.map((episode) => ({
      id: episode.id,
      title: episode.title,
      description: episode.description,
      url: episode.url,
      program: episode.program,
      audiopreference: episode.audiopreference,
      audiopriority: episode.audiopriority,
      audiopresentation: episode.audiopresentation,
      publishdateutc: episode.publishdateutc,
      imageurl: episode.imageurl,
      imageurltemplate: episode.imageurltemplate,
      photographer: episode.photographer,
      broadcasttime: episode.broadcasttime,
      broadcast: episode.broadcast,
      listenpodfile: episode.listenpodfile,
      downloadpodfile: episode.downloadpodfile,
      channelid: episode.channelid,
    }));
  
    return episodes;
  };
  