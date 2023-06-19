import Link from "next/link";
import React from "react";

interface IProps {
  href?: string;
}

const Back = (props: IProps) => {
  const { href } = props;
  return (
    <Link href={`/${href}`}>
      <p className="text-pink-500 hover:underline flex mt-5 text-slate-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
        Back
      </p>
    </Link>
  );
};

export default Back;
