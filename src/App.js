import React from 'react';
import { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  // const fetchMoviesHandler = () => {
  //   // url을 파라미터로 한다. 두 번째 파라미터에는 우리가 원하는 걸 넣어준다.(?) 
  //   fetch('https://swapi.dev/api/films/')
  //     .then((response) => {       // response 객체는 응답이 가지고 있는 여러 가지 데이터를 지니고 있다. response의 body를 확인하고 싶을 때는 굳이 response.body를 적어주지 않아도 된다. 
  //       return response.json();   // response 객체가 가진 .json() 메소드를 사용해 JS에서 사용 가능한 형식으로 변환해준다.
  //     }).then((data) => {         // 윗줄까지 작업이 끝나면(then), 응답의 body부분을 파라미터로 가져올 수 있다. 통상적으로 data로 쓰는 듯하다.
  //       // data에는 results라는 key가 있고 value는 객체들을 담아둔 배열이다. 
  //       const transformedMovies = data.results.map((movieData) => {
  //         return ({
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseData: movieData.release_date,
  //         });
  //       });
  //       setMovies(transformedMovies);
  //     });
  // };

  async function fetchMoviesHandler() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();

    const transformedMovies = data.results.map((movieData) => {
      return (
        {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      );
    });
    setMovies(transformedMovies);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
