import React from "react";
import { useRouter } from "next/router";
import { useStateValue } from "./../../../stateProvider";
import { useState } from "react";
import { createClient } from "pexels";
import { useEffect } from "react";
import SearchNavbar from "../../../components/SearchNavbar";
import Grid2 from "../../../components/Grid2";
import PageTransition from "../../../components/PageTransition";

function SearchVideos() {
  const router = useRouter();
  const [{ darkmode, tab }, dispatch] = useStateValue();
  const [vids, setVids] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { query } = router.query;
  const client = createClient(
    "563492ad6f91700001000001fe896f7c8b9947669ce871c99e286682"
  );
  useEffect(() => {
    client?.videos
      ?.search({ query, per_page: 20 })
      .then((videos) => {
        console.log(videos);
        setVids(videos.videos);
        if (videos.videos === []) {
          setNotFound(true);
        }
      })
      .catch((err) => console.log(err));

    dispatch({
      type: "SET_TAB",
      tab: "videos",
    });
  }, [query]);
  return (
    <PageTransition>
      <div className={`${notFound && "h-screen"}`} data-theme={"garden"}>
        <SearchNavbar />
        <div className="mx-10">
          <h2 className="md:text-4xl flex p-10 my-5 text-primary capitalize">
            {notFound
              ? `We couldn’t find anything for ${query}. Try to refine your search.`
              : `${query} Videos`}
          </h2>
          <Grid2 tab={tab} vids={vids} />
        </div>
      </div>
    </PageTransition>
  );
}

export default SearchVideos;
