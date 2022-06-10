import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchNavbar from "../../../components/SearchNavbar";
import { createClient } from "pexels";
import Grid2 from "../../../components/Grid2";
import { useStateValue } from "../../../stateProvider";
import PageTransition from "../../../components/PageTransition";
import Footer from "../../../components/Footer";
import ReactPaginate from "react-paginate";
function SearchImages() {
  const router = useRouter();
  const [{ darkmode, tab }, dispatch] = useStateValue();
  const [notFound, setNotFound] = useState(false);
  const [pics, setPics] = useState([]);
  const [vids, setVids] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageCount, setPageCount] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
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
    if (tab === "images") {
      if (pics.length >= totalResults) {
        setHasMore(false);
        return;
      }
      setPage(page + 1);
      console.log(page, "infinite");
      client?.photos
        ?.curated({ page: page + 1, per_page: 20 })
        .then(async (photos) => {
          console.log(photos);
          const newPics = photos.photos;
          await setPics((pics) => [...pics, ...newPics]);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };
  useEffect(() => {
    client?.photos
      ?.search({ query, page: 1, per_page: 20 })
      .then((photos) => {
        console.log(photos);
        setPics(photos?.photos);
        setTotalResults(photos?.total_results);

        if (photos?.total_results === 0) {
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
              : `${query} Photos`}
          </h2>
          <Grid2
            totalResults={totalResults}
            tab={tab}
            pics={pics}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
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

export default SearchImages;
