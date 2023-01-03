import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Header(props) {
const navLinkActive = ({ isActive }) => ({
    color: isActive ? "#fff" : "",
    borderBottom: isActive ? "2px solid #fff" : "",
  });

const [keywords, setKeywords] = useState("");
const navigate = useNavigate ();

const handleSearch = () => {
  navigate(`search/?keyword=${keywords.trim()}`);
  if (keywords.length === 0) {
    return;
  }
  setKeywords("");
}

  return (
    <div className="w-full h-24 bg-black flex items-center justify-around">
      <div
        style={{ width: "280px" }}
        className="flex flex-start justify-center h-20 pl-5"
      >
        <NavLink to="/">
        <img
          className="w-full h-full"
          src="https://2phimmoi.net/wp-content/uploads/2021/08/logo.png"
        />
        </NavLink>
      </div>
      <div
        style={{ width: "600px", backgroundColor: "#202020" }}
        className="w-full flex flex-center h-10 ml-10 rounded"
      >
        <FaSearch
          style={{ backgroundColor: "#202020" }}
          className="flex items-center w- h-10 text-white pl-1 w-5 rounded"
          onClick={handleSearch}
        />
        <input
          style={{ backgroundColor: "#202020" }}
          className="w-full h-full pl-2 flex items-center text-white outline-none rounded"
          placeholder="Search..."
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <div className="flex flex-end h-24 items-center">
        <ul className="flex items-center w-full h-full text-white">
            <li className= "px-2"><NavLink style={navLinkActive} to="/">Popular</NavLink></li>
            <li className= "px-2"><NavLink style={navLinkActive} to="/top_rated">Top Rated</NavLink></li>
            <li className= "px-2"><NavLink style={navLinkActive} to="/trending">Trending</NavLink></li>
            <li className= "px-2"><NavLink style={navLinkActive} to="/Comedy">Comedy</NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
