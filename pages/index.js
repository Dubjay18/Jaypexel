import Head from "next/head";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

import { useStateValue } from "../stateProvider";
import headIcon from "../public/vercel.svg";
import ogIcon from "../svgs/logoj.svg";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import { createClient } from "pexels";
import { useEffect } from "react";
import Grid from "../components/Grid";
import Grid2 from "../components/Grid2";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const searchRef = useRef();
  const [pics, setPics] = useState([]);
  const [vids, setVids] = useState([]);
  const [{ tab }, dispatch] = useStateValue();
  const client = createClient(
    "563492ad6f91700001000001fe896f7c8b9947669ce871c99e286682"
  );
  const refScroll = (e) => {
    e.current?.scrollIntoView({ behaviour: "smooth" });
  };
  useEffect(() => {
    if (tab === "images") {
      client?.photos
        ?.curated({ page: 1, per_page: 20 })
        .then((photos) => {
          console.log(photos);
          setPics(photos.photos);
        })
        .catch((err) => console.log(err));
    } else {
      client?.videos?.popular({ page: 1, per_page: 20 }).then((videos) => {
        console.log(videos);
        setVids(videos.videos);
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
    <div data-theme={"garden"} className={"  bg-base-100"}>
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
        <h2 className="flex items-center justify-center my-9 border-b-2 border-secondary">
          Free stock {tab}
        </h2>
        <Grid2 pics={pics} tab={tab} vids={vids} />
      </div>
    </div>
  );
}
