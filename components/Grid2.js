import React, { useState } from "react";
import { PlayIcon, DownloadIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
import { Image } from "react-img-placeholder";
import ReactPaginate from "react-paginate";
import { useStateValue } from "../stateProvider";
function Grid2({ search, pics, tab, vids }) {
  const [isLoading, setLoading] = useState(true);
  const [{ page }, dispatch] = useStateValue();
  const [pageCount, setPageCount] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedVidId, setSelectedVidId] = useState(null);
  const handlePageClick = (event) => {
    // NProgress.start();
    // setLoading(true);
    // const newOffset = (event.selected + 1 * itemsPerPage) % ?.length;
    dispatch({
      type: "SET_PAGE",
      page: event.selected + 1,
    });
    // getMovies(event.selected + 1);
    // console.log(newOffset);
    // // setItemOffset(newOffset);
    // NProgress.done();
    // setLoading(false);
  };
  return (
    <div
      className={`md:columns-3 columns-2 gap-2  md:mx-10 mx-1 space-y-3 pb-28 ${
        tab === "images" ? "" : ""
      }`}
    >
      {tab === "images"
        ? pics?.map((image, i) => (
            <>
              {" "}
              <motion.div
                className="bg-gray-200 cursor-pointer break-inside-avoid hover:opacity-75 transition-all duration-500"
                key={i}
              >
                <Image
                  onClick={() => setSelectedId(i + 1)}
                  src={image?.src?.large}
                  className={`
        hover:opacity-75 duration-700 ease-in-out rounded-lg cursor-pointer
        grayscale-0 blur-0 scale-100`}
                  placeholderColor={image?.avg_color}
                  width={image?.width / 3}
                  height={image?.height / 3}
                  onLoad={() => setLoading(false)}
                  alt=""
                />
              </motion.div>{" "}
            </>
          ))
        : vids?.map((vid, i) => {
            return (
              <div
                className="bg-gray-200 cursor-pointer break-inside-avoid hover:opacity-75 transition-all duration-500 relative group"
                key={i}
              >
                {!isLoading && (
                  <PlayIcon className="md:w-14 w-7 group-hover:text-primary z-30 text-white absolute top-[40%]  transition-all duration-500 left-[30%]" />
                )}

                <Image
                  onClick={() => setSelectedVidId(i + 1)}
                  src={vid?.image}
                  placeholderColor="gray"
                  width={"500px"}
                  height={"500px"}
                  className={`
        'hover:opacity-75 duration-700 ease-in-out rounded-lg cursor-pointer'
         grayscale-0 blur-0 scale-100
        `}
                  onLoad={() => setLoading(false)}
                  alt=""
                />
              </div>
            );
          })}
      <AnimatePresence>
        {selectedId && (
          <motion.div>
            <motion.input
              type="checkbox"
              defaultChecked
              id="my-modal-3"
              className="modal-toggle"
            />
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onExit={{ opacity: 0, scale: 0 }}
            >
              <motion.div className="modal-box relative">
                <motion.label
                  onClick={() => setSelectedId(null)}
                  className="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
                >
                  ✕
                </motion.label>
                <motion.a
                  href={pics[selectedId - 1]?.url}
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="space-y-10 btn btn-primary absolute top-7"
                >
                  <DownloadIcon className="w-7" />
                </motion.a>
                <img
                  src={pics[selectedId - 1]?.src?.large}
                  height={pics[selectedId - 1]?.height / 5}
                  width={pics[selectedId - 1]?.width / 5}
                />

                {console.log(pics[selectedId])}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {selectedVidId && (
          <motion.div>
            <motion.input
              type="checkbox"
              defaultChecked
              id="my-modal-3"
              className="modal-toggle"
            />
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <motion.div className="modal-box relative">
                <motion.label
                  onClick={() => setSelectedVidId(null)}
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </motion.label>
                <motion.a
                  href={vids[selectedVidId - 1]?.url}
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="space-y-10 btn btn-primary absolute top-7"
                >
                  <DownloadIcon className="w-7 cursor-pointer" />
                </motion.a>

                <ReactPlayer
                  url={vids[selectedVidId - 1]?.video_files[0]?.link}
                  controls
                  muted
                  width={"100%"}
                  light={vids[selectedVidId - 1]?.image}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Grid2;
