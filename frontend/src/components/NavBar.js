import { useAuth } from "../context/useAuth";
import React from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

const UserDetails = React.memo(({ user, logout }) => {
  if (!user) return null;

  return (
    <div className="flex flex-row text-white">
      Login as : {user.username}
      <span className=" ml-4 hover:underline">
        <botton
          href="/#"
          onClick={logout}
          className="flex flex-row items-center"
        >
          <ArrowRightEndOnRectangleIcon className="size-5 " />
          Logout
        </botton>
      </span>
    </div>
  );
});

export default function NavigationBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-primarydark">
      <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <div className="w-fit">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              PSU Registrar System
            </span>
          </a>
        </div>

        {/* Links Section */}
        {/* <div className="items-center justify-between" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-blue-950 md:dark:bg-blue-950 dark:border-blue-950">
            {user && user.role === "student" && (
              <li>
                <a
                  href="/student/dashboard"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dashboard
                </a>
              </li>
            )}
            {user && user.role === "teacher" && (
              <li>
                <a
                  href="/teacher/dashboard/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dashboard
                </a>
              </li>
            )}
          </ul>
        </div> */}

        {/* User Details Section */}
        <div className="w-fit">
          <UserDetails user={user} logout={logout} />
        </div>
      </div>
    </nav>
  );
}
