import React from "react";
import { useStateValue } from "../stateProvider";

function Navbar({ searchRef, refScroll }) {
  const [{ nav }] = useStateValue();
  return (
    <div
      className={`navbar bg-base-100 sticky top-0 z-50  ${!nav && "shadow"}`}
    >
      <div className="navbar-start">
        <div className="bg-primary p-3 rounded-lg flex justify-center items-center">
          <h1 className="text-white ">JP</h1>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">JAYpexel</a>
      </div>
      <div className="navbar-end">
        {!nav && (
          <button
            onClick={() => refScroll(searchRef)}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        )}
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-sm indicator-item">1</span>
            </div>
          </label>
          <div
            tabIndex="0"
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow-lg"
          >
            <div className="card-body bg-base-200">
              {/* <span className="font-bold text-lg">8 Items</span> */}
              <span className="text-error font-bold font-poppins">
                Working in paginaton
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
