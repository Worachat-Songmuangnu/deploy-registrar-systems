// components/StudentSearch.js
import React from "react";

const StudentSearch = (props) => {
  return (
    <form class="flex items-center ">
      <label for="simple-search" class="sr-only">
        Search
      </label>
      <div class="relative w-full">
        <input
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  "
          placeholder="Search for subject..."
          required
        />
      </div>
      <button
        type="submit"
        class="p-2.5 ms-2 text-sm font-medium text-white bg-primarydark rounded-lg border border-primaryfade hover:bg-primaryfade focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </form>
  );
};

export default StudentSearch;
