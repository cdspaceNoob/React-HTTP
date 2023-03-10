import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

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
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);     // 에러 초기화.

    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error('Something went wrong');
        // 여기서 발생시킨 Error 객체는 catch의 첫 번째 파라미터로 들어간다.(통상적으로 error라는 이름으로.)
        // 에러의 내용으로 문자열을 입력했을 때, 이 문자열은 Error 객체가 가진 message 프로퍼티로 들어간다. 
      }

      const data = await response.json();

      console.log('json parsing OK')
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
      // setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movie found.</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
