import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setMovieDetail } from "../store/actions";
import "./style.css";

  function Popular(props) {
    const {movies} = props;

    const dispatch = useDispatch();

    const handleClick = (movie) => {
      dispatch(setMovieDetail(movie));
    };
  
    return (
      <div className="w-full bg-black text-white pt-24 px-5">
        <div className="w-full grid grid-cols-5 gap-4 ">
          {movies &&
            movies.map((movie, index) => (
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
                   <Link to={`${movie.id}`}
                    onClick={() => handleClick(movie)}
                    className="">
                   Info Movie
                   </Link>
                   
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  
  export default Popular;