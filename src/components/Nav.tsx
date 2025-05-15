import React from "react";
import { Link } from "react-router-dom";
import {
  IconSpotify,
  IconUser,
  IconTime,
  IconMicrophone,
  IconPlaylist,
  IconMusic,
  IconGithub,
} from "./icons";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}
const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className={`block w-full h-full ${window.location.pathname === to ? "active" : ""}`}
    >
      {children}
    </Link>
  );
};

const Nav: React.FC = () => {
  return (
    <nav className="fixed w-[90px] sm:w-full min-sm:h-full min-sm:flex min-sm:flex-col min-sm:justify-around bottom-0 left-0 min-sm:top-0 min-sm:right-auto min-sm:left-auto bg-nav-black">
      {/* Logo */}
      <div className="mt-8 w-16 h-16 text-green hover:text-off-green transition-colors grid place-items-center mx-auto sm:hidden">
        <Link to="/" className="block">
          <IconSpotify className="w-12" />
        </Link>
      </div>

      {/* Menu */}
      <ul className="w-full grid grid-cols-1 sm:grid-cols-5 my-auto">
        <li className="text-light-grey text-xs">
          <NavLink to="/">
            <div className="py-4 border-t-4 border-transparent hover:bg-black hover:text-white hover:border-off-green flex flex-col items-center justify-center min-sm:border-r-4 min-sm:border-t-0">
              <IconUser className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Profile</span>
            </div>
          </NavLink>
        </li>

        <li className="text-light-grey text-xs">
          <NavLink to="artists">
            <div className="py-4 border-t-4 border-transparent hover:bg-black hover:text-white hover:border-off-green flex flex-col items-center justify-center min-sm:border-r-4 min-sm:border-t-0">
              <IconMicrophone className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Top Artists</span>
            </div>
          </NavLink>
        </li>
        <li className="text-light-grey text-xs">
          <NavLink to="tracks">
            <div className="py-4 border-t-4 border-transparent hover:bg-black hover:text-white hover:border-off-green flex flex-col items-center justify-center min-sm:border-r-4 min-sm:border-t-0">
              <IconMusic className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Top Tracks</span>
            </div>
          </NavLink>
        </li>
        <li className="text-light-grey text-xs">
          <NavLink to="recent">
            <div className="py-4 border-t-4 border-transparent hover:bg-black hover:text-white hover:border-off-green flex flex-col items-center justify-center min-sm:border-r-4 min-sm:border-t-0">
              <IconTime className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Recent</span>
            </div>
          </NavLink>
        </li>
        <li className="text-light-grey text-xs">
          <NavLink to="playlists">
            <div className="py-4 border-t-4 border-transparent hover:bg-black hover:text-white hover:border-off-green flex flex-col items-center justify-center min-sm:border-r-4 min-sm:border-t-0">
              <IconPlaylist className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Playlists</span>
            </div>
          </NavLink>
        </li>
      </ul>

      {/* Github */}
      <div className="w-16 h-16 text-green hover:text-off-green transition-colors grid place-items-center mx-auto sm:hidden">
        <a
          href="https://github.com/thesalmankhxn/spotify-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="w-7">
            <IconGithub />
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Nav;
