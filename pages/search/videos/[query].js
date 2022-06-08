import React from "react";
import { useRouter } from "next/router";
import { useStateValue } from "./../../../stateProvider";
import { useState } from "react";
import { createClient } from "pexels";
import { useEffect } from "react";
import SearchNavbar from "../../../components/SearchNavbar";
import Grid2 from "../../../components/Grid2";
import PageTransition from "../../../components/PageTransition";
import ReactPaginate from "react-paginate";
import Footer from "../../../components/Footer";

function SearchVideos() {
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);
  const [{ darkmode, tab }, dispatch] = useStateValue();
  const [vids, setVids] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageCount, setPageCount] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [vidPage, setVidPage] = useState(1);
  const { query } = router.query;
  const client = createClient(
    "563492ad6f91700001000001fe896f7c8b9947669ce871c99e286682"
  );
  const handlePageClick = (event) => {
    dispatch({
      type: "SET_PAGE",
      page: event.selected + 1,
    });
  };
  const fetchMoreData = () => {
    if (tab === "videos") {
      if (vids.length >= totalResults) {
        setHasMore(false);
        return;
      }
      setVidPage(vidPage + 1);
      console.log(vidPage, "infinite");
      client?.videos
        ?.popular({ page: vidPage + 1, per_page: 20 })
        .then(async (videos) => {
          console.log(videos);
          const newVids = videos?.videos;
          await setVids((vids) => [...vids, ...newVids]);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    client?.videos
      ?.search({ query, page: 1, per_page: 20 })
      .then((videos) => {
        console.log(videos);
        setVids(videos.videos);
        setTotalResults(videos?.total_results);
        setPageCount(Math.ceil(totalResults / videos?.per_page));
        if (videos?.total_results === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
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
      <div
        className={`${notFound && "h-screen"} min-h-[100vh] overflow-x-hidden`}
        data-theme={"garden"}
      >
        <SearchNavbar />
        <div className="mx-10">
          <h2 className="md:text-4xl flex p-10 my-5 text-primary capitalize">
            {notFound
              ? `We couldn’t find anything for ${query}. Try to refine your search.`
              : `${query} Videos`}
          </h2>
          <Grid2
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
            tab={tab}
            vids={vids}
          />
        </div>
        {/* {!notFound && (
          <div className="flex justify-center items-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              previousLabel="< previous"
              className="btn-group "
              previousLinkClassName="btn btn-outline"
              nextLinkClassName="btn btn-outline"
              activeLinkClassName="btn btn-active bg-primary"
              pageLinkClassName="btn btn-outline"
              initialPage={page - 1}
            />
          </div>
        )} */}
        <Footer />
      </div>
    </PageTransition>
  );
}

export default SearchVideos;
