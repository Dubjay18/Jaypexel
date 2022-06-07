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
  const [{ darkmode, tab, page }, dispatch] = useStateValue();
  const [notFound, setNotFound] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pics, setPics] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
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
  useEffect(() => {
    client?.photos
      ?.search({ query, page: page, per_page: 20 })
      .then((photos) => {
        console.log(photos);
        setPics(photos.photos);
        setTotalResults(photos?.total_results);
        setPageCount(Math.ceil(totalResults / photos?.per_page));
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
  }, [query, page]);
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
          <Grid2 totalResults={totalResults} search tab={tab} pics={pics} />
        </div>
        {!notFound && (
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
        )}

        <Footer />
      </div>
    </PageTransition>
  );
}

export default SearchImages;
