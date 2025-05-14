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
    <nav className="fixed top-0 left-0 w-64 min-h-screen bg-nav-black text-center z-50 shadow-lg flex flex-col justify-between md:bottom-0 md:top-auto md:right-0 md:w-full md:h-20 md:min-h-20 md:flex-row">
      {/* Logo */}
      <div className="mt-8 w-16 h-16 text-green hover:text-off-green transition-colors md:hidden">
        <Link to="/" className="block">
          <IconSpotify className="w-12" />
        </Link>
      </div>

      {/* Menu */}
      <ul className="flex flex-col md:flex-row md:items-end md:justify-center">
        <li className="text-light-grey text-xs md:flex-grow md:flex-basis-full md:h-full">
          <NavLink to="/">
            <div className="py-4 border-l-4 border-transparent hover:bg-black hover:text-white hover:border-off-green md:flex md:flex-col md:items-center md:justify-center md:border-l-0 md:border-t-3">
              <IconUser className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Profile</span>
            </div>
          </NavLink>
        </li>
        <li className="text-light-grey text-xs md:flex-grow md:flex-basis-full md:h-full">
          <NavLink to="artists">
            <div className="py-4 border-l-4 border-transparent hover:bg-black hover:text-white hover:border-off-green md:flex md:flex-col md:items-center md:justify-center md:border-l-0 md:border-t-3">
              <IconMicrophone className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Top Artists</span>
            </div>
          </NavLink>
        </li>
        <li className="text-light-grey text-xs md:flex-grow md:flex-basis-full md:h-full">
          <NavLink to="tracks">
            <div className="py-4 border-l-4 border-transparent hover:bg-black hover:text-white hover:border-off-green md:flex md:flex-col md:items-center md:justify-center md:border-l-0 md:border-t-3">
              <IconMusic className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Top Tracks</span>
            </div>
          </NavLink>
        </li>
        <li className="text-light-grey text-xs md:flex-grow md:flex-basis-full md:h-full">
          <NavLink to="recent">
            <div className="py-4 border-l-4 border-transparent hover:bg-black hover:text-white hover:border-off-green md:flex md:flex-col md:items-center md:justify-center md:border-l-0 md:border-t-3">
              <IconTime className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Recent</span>
            </div>
          </NavLink>
        </li>
        <li className="text-light-grey text-xs md:flex-grow md:flex-basis-full md:h-full">
          <NavLink to="playlists">
            <div className="py-4 border-l-4 border-transparent hover:bg-black hover:text-white hover:border-off-green md:flex md:flex-col md:items-center md:justify-center md:border-l-0 md:border-t-3">
              <IconPlaylist className="w-5 h-5 mb-1.5 mx-auto" />
              <span>Playlists</span>
            </div>
          </NavLink>
        </li>
      </ul>

      {/* Github */}
      <div className="mb-8 w-11 h-11 text-light-grey hover:text-blue md:hidden">
        <a
          href="https://github.com/bchiang7/spotify-profile"
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
