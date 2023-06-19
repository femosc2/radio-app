import { getChannel, getPrograms } from "../Utils/http";
import Back from "../components/Back";
import ChannelHeader from "../components/Header";
import Program from "../components/Program";

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
            <Program key={program.id} program={program} />
          ))}
        </ul>
        <footer className="mt-8">
          <Back href={"Channel"} />
        </footer>
      </main>
    </section>
  );
};

export default Channel;
