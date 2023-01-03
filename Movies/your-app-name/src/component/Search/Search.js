import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getSearchMovie, setMovieDetail } from "../store/actions";

const useQuery = () => new URLSearchParams(useLocation().search);
  function Search() {
   const {SearchMovie} = useSelector((state) => state.infoMovies);
    const dispatch = useDispatch();
    console.log(SearchMovie);

    const keyword = useQuery().get("keyword");
    useEffect(() =>{
      if(keyword) dispatch(getSearchMovie(keyword));
    }, [dispatch, keyword]);

    const handleClick = (movie) => {
      dispatch(setMovieDetail(movie));
    };
    return (
      <div className="w-full bg-black text-white pt-24 px-5">
        {SearchMovie && SearchMovie.length > 0 ? (<div className="w-full grid grid-cols-5 gap-4 ">
          {SearchMovie &&
            SearchMovie.map((movie, index) => (
              <div
                key={index}
                className="items relative rounded overflow-hidden"
              >
                <img
                  className="w-full h-auto scale-100 rounded"
                  src={movie.poster_path}
                  alt=""
                />
                <div className="movie-name absolute left-0 right-0 bottom-0 p-1 text-center ">
                  {movie.name}
                </div>
                <div className="absolute control-btn left-0 right-0 top-2/4 text-center">
                  <button className="btn-control bg-black text-xs w-22 px-3 py-1 rounded mr-1">
                    <Link
                    to={`${movie.id}`}
                    onClick={() =>handleClick(movie)}
                    className="">
                      Info Movie
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>) : (
          <div>
            <div className="flex items-center justify-center pt-2/4">
            <h1 className="failed flex items-center justify-content rounded-md">No results found!!!</h1> 
          </div>
          <div className= "image-size">
              <img className="imagg-size block mx-auto"
              src="https://acegif.com/wp-content/gif/crying-53.gif"/>
            </div>
          </div>
        )}
        
      </div>
    );
  }
  
  export default Search;