import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchNavbar from "../../../components/SearchNavbar";
import { createClient } from "pexels";
import Grid2 from "../../../components/Grid2";
import { useStateValue } from "../../../stateProvider";
function SearchImages() {
  const router = useRouter();
  const [{ darkmode, tab }, dispatch] = useStateValue();
  const [notFound, setNotFound] = useState(false);
  const [pics, setPics] = useState([]);
  const { query } = router.query;
  const client = createClient(
    "563492ad6f91700001000001fe896f7c8b9947669ce871c99e286682"
  );
  useEffect(() => {
    client?.photos
      ?.search({ query, per_page: 20 })
      .then((photos) => {
        console.log(photos);
        setPics(photos.photos);
        if (photos.total_results === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      })
      .catch((err) => console.log(err));

    dispatch({
      type: "SET_TAB",
      tab: "images",
    });
  }, [query]);
  return (
    <div className={`${notFound && "h-screen"}`} data-theme={"garden"}>
      <SearchNavbar />
      <div className="mx-10">
        <h2 className="md:text-4xl flex p-10 my-5 text-primary capitalize">
          {notFound
            ? `We couldn’t find anything for ${query}. Try to refine your search.`
            : `${query} Photos`}
        </h2>
        <Grid2 tab={tab} pics={pics} />
      </div>
    </div>
  );
}

export default SearchImages;
