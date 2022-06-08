import Head from "next/head";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useStateValue } from "../stateProvider";
import headIcon from "../public/vercel.svg";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import { createClient } from "pexels";
import { useEffect } from "react";
import Grid2 from "../components/Grid2";
import Footer from "../components/Footer";

export default function Home() {
  const searchRef = useRef();
  const [pics, setPics] = useState([]);
  const [vids, setVids] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageCount, setPageCount] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [vidPage, setVidPage] = useState(1);
  const [{ tab }, dispatch] = useStateValue();
  const client = createClient(
    "563492ad6f917000010000017a8bffa53a184119b151efe49f91edb6"
  );
  const refScroll = (e) => {
    e.current?.scrollIntoView({ behaviour: "smooth" });
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
          alert(error);
        });
    } else {
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
  useEffect(async () => {
    if (tab === "images") {
      client?.photos
        ?.curated({ page: 1, per_page: 20 })
        .then(async (photos) => {
          console.log(photos);
          await setPics(photos.photos);
          setTotalResults(photos?.total_results);
          await setPageCount(Math.ceil(totalResults / photos?.per_page));
          console.log(pageCount, totalResults);
        })
        .catch((err) => console.log(err));
    } else {
      client?.videos?.popular({ page: 1, per_page: 20 }).then((videos) => {
        console.log(videos);
        setVids(videos.videos);
        setTotalResults(videos?.total_results);
        setPageCount(Math.ceil(totalResults / videos?.per_page));
        console.log(pageCount, totalResults);
      });
    }
  }, [tab]);

  async function changeTab(e) {
    dispatch({
      type: "SET_TAB",
      tab: e,
    });
  }
  async function AlertDismissible(words, error) {
    if (!error) {
      toast.success(words, {
        position: "top-right",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(words, {
        position: "top-right",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div
      data-theme={"garden"}
      className={"min-h-[100vh] overflow-x-hidden  bg-base-100"}
    >
      <Head>
        <title>JAYpexel</title>
        <link rel="icon" href={headIcon.src} sizes="16x16 32x32" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
      </Head>

      <div className="cus-scroll">
        <Navbar refScroll={refScroll} searchRef={searchRef} />
        <Hero searchRef={searchRef} tab={tab} />
        <Tabs tab={tab} changeTab={changeTab} />
        <div className="mx-5">
          <h2 className="md:text-3xl underline dotted flex items-center justify-center my-9 border-b-2 border-secondary decoration-dashed text-primary">
            Free stock {tab}
          </h2>
          <Grid2
            pics={pics}
            tab={tab}
            vids={vids}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
