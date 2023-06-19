import React from "react";

interface IProps {
  image?: string;
  tagline?: string;
}

const ChannelHeader = (props: IProps) => {
  const { image, tagline } = props;
  return (
    <header className="flex justify-between mt-4">
      <img src={image} alt="Channel Image" className="w-24 h-24" />
      <h1 className="text-medium mt-5 text-gray-400 ml-10 w-auto">{tagline}</h1>
    </header>
  );
};

export default ChannelHeader;
