import Link from "next/link";
import Image from "next/image";
import { IProgram } from "@/app/Types/types";

interface IProps {
  program: IProgram;
}
const Program = (props: IProps) => {
  const { program } = props;
  return (
    <li key={program.id}>
      <Link href={`/Channel/Episodes/${program.id}`}>
        <article className="flex items-center space-x-4 cursor-pointer">
          <Image
            src={program.programimage}
            alt={program.name}
            className="w-24 h-24"
            height={96}
            width={96}
            loading="lazy"
          />
          <div>
            <h2 className="text-xl text-white">{program.name}</h2>
            <p className="text-gray-500">{program.description}</p>
          </div>
        </article>
      </Link>
      <hr className="h-px my-8 bg-gray-100 border-0 dark:bg-gray-800" />
    </li>
  );
};

export default Program;
