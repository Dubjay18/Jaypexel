import Link from "next/link";
import React from "react";
import { useStateValue } from "../stateProvider";

function FilterButton({ title }) {
  const [{ darkmode, tab }, dispatch] = useStateValue();
  return (
    <>
      {" "}
      {title && (
        <button className="btn md:btn-md btn-sm mx-2  btn-outline  btn-primary">
          <Link href={`/search/images/${title}`}>{title}</Link>
        </button>
      )}{" "}
    </>
  );
}

export default FilterButton;
