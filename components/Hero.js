import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useStateValue } from "../stateProvider";

function Hero({ tab, searchRef }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [{ nav }, dispatch] = useStateValue();
  const { ref, inView } = useInView();
  const router = useRouter();
  const pushSearch = (e) => {
    e.preventDefault();

    router.push(`/search/${tab}/${searchQuery}`);
  };
  useEffect(() => {
    if (inView) {
      dispatch({
        type: "SET_NAV",
        nav: true,
      });
    }
    if (!inView) {
      dispatch({
        type: "SET_NAV",
        nav: false,
      });
    }
  }, [inView]);
  return (
    <div
      className="hero min-h-[50vh]"
      style={{
        backgroundImage: `${
          tab === "images" && "url(https://api.lorem.space/image?w=1000&h=400)"
        }`,
      }}
    >
      {tab === "videos" && (
        <video
          autoPlay
          muted
          loop
          poster="https://www.pexels.com/assets/videos/free-videos-7daa2ef41a140f70c757ce91913a4ecb90570b7d7cd2b401bae868350e02c83a.jpg"
          className="hero_vi"
        >
          <source src="https://static.pexels.com/lib/videos/free-videos.mp4" />
        </video>
      )}
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg" ref={searchRef}>
          <h2 className="mb-5 md:text-5xl font-bold">
            The best free stock photos, royalty free images & videos shared by
            creators.
          </h2>

          <div className="flex items-center justify-center ">
            <form onSubmit={pushSearch} className="form-control " ref={ref}>
              <div className="input-group mx-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered input-md md:w-96 text-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-square" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
