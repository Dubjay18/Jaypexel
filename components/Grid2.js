import React, { useState } from "react";
import { PlayIcon, DownloadIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
function Grid2({ pics, tab, vids }) {
  const [isLoading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedVidId, setSelectedVidId] = useState(null);

  return (
    <div
      className={`md:columns-4 columns-2 gap-1  mx-auto space-y-3 pb-28 ${
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
                <motion.img
                  onClick={() => setSelectedId(i)}
                  src={image?.src?.large}
                  className={`
        'hover:opacity-75 duration-700 ease-in-out rounded-lg cursor-pointer'
        ${
          isLoading
            ? "grayscale blur-2xl scale-110"
            : "grayscale-0 blur-0 scale-100"
        }`}
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
                <PlayIcon className="md:w-14 w-7 group-hover:text-primary z-30 text-white absolute top-[40%]  transition-all duration-500 left-[30%]" />
                {console.log(vid)}

                <motion.img
                  onClick={() => setSelectedVidId(i)}
                  src={vid?.image}
                  className={`
        'hover:opacity-75 duration-700 ease-in-out rounded-lg cursor-pointer'
        ${
          isLoading
            ? "grayscale blur-2xl scale-110"
            : "grayscale-0 blur-0 scale-100"
        }`}
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
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </motion.label>
                <motion.a
                  href={pics[selectedId]?.url}
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="space-y-10 btn btn-primary absolute top-7"
                >
                  <DownloadIcon className="w-7" />
                </motion.a>
                <img
                  src={pics[selectedId]?.src?.large}
                  height={pics[selectedId]?.height / 5}
                  width={pics[selectedId]?.width / 5}
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
                  href={vids[selectedVidId]?.url}
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="space-y-10 btn btn-primary absolute top-7"
                >
                  <DownloadIcon className="w-7 cursor-pointer" />
                </motion.a>

                <ReactPlayer
                  url={vids[selectedVidId]?.video_files[0]?.link}
                  controls
                  muted
                  width={"100%"}
                  light={vids[selectedVidId]?.image}
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
