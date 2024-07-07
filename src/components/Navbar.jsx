import { removeDataFromLocalStorage } from "@/utils/deleteStateData";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
  return (
    <>
      <div className={`flex min-h-screen  `}>
        <div className="fixed top-12 left-0">
          <img src="/logo.png" alt="logo" className="md:hidden w-[120px]" />
        </div>
        <div className={`bg-neutral-900 border-r border-neutral-900  md:w-64`}>
          <div className="py-4 px-6 flex items-center justify-center">
            <Link to="/">
              <img src="/logo.png" alt="logo" className="w-[190px]" />
            </Link>
          </div>

          <div className="mb-10">
            <h3 className="mx-6 mb-2 text-xs text-gray-200 uppercase tracking-widest">
              Main
            </h3>

            <Link
              to="/dashboard"
              className="flex items-center px-6 py-2.5 text-gray-500 hover:text-red-600 group"
            >
              <svg
                className="h-5 w-5 text-gray-200 mr-2 group-hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V4C11 3.44772 10.5523 3 10 3H4C3.44772 3 3 3.44772 3 4V12ZM3 20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V16C11 15.4477 10.5523 15 10 15H4C3.44772 15 3 15.4477 3 16V20ZM13 20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V12C21 11.4477 20.5523 11 20 11H14C13.4477 11 13 11.4477 13 12V20ZM14 3C13.4477 3 13 3.44772 13 4V8C13 8.55228 13.4477 9 14 9H20C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H14Z"></path>
              </svg>
              Dashboard
            </Link>
          </div>

          <div className="mb-10">
            <h3 className="mx-6 mb-2 text-xs text-gray-200 uppercase tracking-widest">
              Series
            </h3>

            <Link
              to="/add-series"
              className="flex items-center px-6 py-2.5 text-gray-500 hover:text-red-600 group"
            >
              <svg
                className="h-5 w-5 text-gray-200 mr-2 group-hover:text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
              </svg>
              Add Series
            </Link>

            <Link
              to="/view-series"
              className="flex items-center px-6 py-2.5 text-gray-500 hover:text-red-600 group"
            >
              <svg
                className="h-5 w-5 text-gray-200 mr-2 group-hover:text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
              </svg>
              View Serises
            </Link>
          </div>
          <div className="mb-10">
            <h3 className="mx-6 mb-2 text-xs text-gray-200 uppercase tracking-widest">
              Videos
            </h3>

            <Link
              to="/add-video"
              className="flex items-center px-6 py-2.5 text-gray-500 hover:text-red-600 group"
            >
              <svg
                className="h-5 w-5 text-gray-200 mr-2 group-hover:text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 4C16.5523 4 17 4.44772 17 5V9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V5C1 4.44772 1.44772 4 2 4H16ZM8 8V11H5V13H7.999L8 16H10L9.999 13H13V11H10V8H8Z"></path>
              </svg>
              Add Videos
            </Link>

            <Link
              to="/view-videos"
              className="flex items-center px-6 py-2.5 text-gray-500 hover:text-red-600 group"
            >
              <svg
                className="h-5 w-5 text-gray-200 mr-2 group-hover:text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM14 10.25V8H7V14H14V11.75L17 14V8L14 10.25Z"></path>
              </svg>
              View Videos
            </Link>
          </div>
          <div className="mb-10">
            <h3 className="mx-6 mb-2 text-xs text-gray-200 uppercase tracking-widest">
              More
            </h3>

            <Link
              onClick={() => {
                removeDataFromLocalStorage();
                Navigate("/");
              }}
              className="flex items-center px-6 py-2.5 text-gray-500 hover:text-red-600 group"
            >
              Logout
            </Link>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default Navbar;
