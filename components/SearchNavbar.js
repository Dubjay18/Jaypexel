import { useRouter } from "next/router";
import React, { useState } from "react";
import { useStateValue } from "../stateProvider";

function SearchNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [{ tab }] = useStateValue();
  const router = useRouter();
  const pushSearch = (e) => {
    e.preventDefault();

    router.push(`/search/${tab}/${searchQuery}`);
  };
  return (
    <div className="navbar py-5 z-50 bg-base-100 shadow sticky top-0 flex-wrap">
      <div className="flex-1">
        <div className="bg-primary p-3 rounded-lg flex justify-center items-center">
          <h1 className="text-white ">JP</h1>
        </div>
        <a
          className="btn btn-ghost normal-case text-xl"
          onClick={() => router.push("/")}
        >
          JAYpexel
        </a>
      </div>
      <div className="flex-none gap-2">
        <form onSubmit={pushSearch} className="form-control ">
          <div className="input-group mx-auto">
            <input
              type="search"
              placeholder="Search..."
              className="input input-bordered input-md md:w-96 text-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square btn-primary" type="submit">
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
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchNavbar;
