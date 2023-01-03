import logo from './logo.svg';
import './App.css';
import Header from "./component/Header";
import Popular from './component/Page/Popular';
import {Routes, Route} from "react-router-dom"
import TopRated from './component/Page/TopRated';
import Trending from './component/Page/Trending';
import Comedy from './component/Page/Comedy';
import Footer from './component/Page/Footer';
import Search from './component/Search/Search';
import DetailMovie from './component/DetailMovie/DetailMovie';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getPopularMovies, getTopRatedMovies,
  getTrendingMovies,
  getComedyMovies,
} from "./component/store/actions";




function App() {
  const {MovieDetail, PopularMovies , ComdedyMovies,TopRatedMovies,
    TrendingMovies,
} = useSelector (
    (state) => state.infoMovies
  ); 
  
  const dispatch = useDispatch();
    useEffect (() =>{
      dispatch(getPopularMovies());
    });
    useEffect(() => {
      dispatch(getPopularMovies());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(getTopRatedMovies());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(getTrendingMovies());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(getComedyMovies());
    }, [dispatch]);
  
 
  return (
    <div className="">
      <Header />
      {/* <Routes>
        <Route path="/" element={<Popular movies={PopularMovies} />}></Route>
        <Route path="/:id" element={<DetailMovie movie={MovieDetail}/>}></Route>
        <Route path="/" element={<Popular />}></Route>
        <Route path="/top_rated" element={<TopRated />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/comedy" element={<Comedy movies={ComdedyMovies} />}></Route>
        <Route path="/Search" element={<Search />}></Route>
        <Route path="/detail" element={<DetailMovie />}></Route>
        <Route path="/search/:id" element={<DetailMovie movie={MovieDetail}/>}></Route>
      </Routes> */}
      <Routes>
        <Route path="/" element={<Popular movies={PopularMovies} />}></Route>
        <Route path="/:id" element={<DetailMovie movie={MovieDetail} />}></Route>
        <Route path="/top_rated" element={<TopRated movies={TopRatedMovies} />}></Route>
        <Route path="/top_rated/:id" element={<DetailMovie movie={MovieDetail} />}></Route>
        <Route path="/trending" element={<Trending movies={TrendingMovies} />}></Route>
        <Route path="/trending/:id" element={<DetailMovie movie={MovieDetail} />}></Route>
        <Route path="/comedy" element={<Comedy movies={ComdedyMovies} />}></Route>
        <Route path="/comedy/:id" element={<DetailMovie movie={MovieDetail} />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/:id"element={<DetailMovie movie={MovieDetail} />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
