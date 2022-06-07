import React from "react";

function Tabs({ changeTab, tab }) {
  return (
    <div className="flex border-b-2 items-center justify-center py-7">
      <div className="tabs shadow">
        <a
          onClick={() => changeTab("images")}
          className={`tab lg:tab-lg tab-bordered ${
            tab === "images" ? "tab-active" : ""
          }`}
        >
          Images
        </a>
        <a
          onClick={() => changeTab("videos")}
          className={`tab lg:tab-lg tab-bordered ${
            tab === "videos" ? "tab-active" : ""
          }`}
        >
          Videos
        </a>
      </div>
    </div>
  );
}

export default Tabs;
