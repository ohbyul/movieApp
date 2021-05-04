import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./App.css"; 



class App extends React.Component {
    state = {
        isLoading: true,
        movies: []
    };

    getMovies = async () => {
        const {
            data: {
                data: {
                    movies
                }
            }
        } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
        // async 비동기 라는뜻 "너는 이걸 기다려야 해" 라는 뜻 await  axios.get이 완료 되기까지 시간이 조금 필요함으로
        // axios.get api로 데이타를 가져옴
        this.setState({movies, isLoading: false});
        //this.setState({movies:movies});
    }
    componentDidMount() {
        this.getMovies();
    };
    render() {
        const {isLoading, movies} = this.state;
        return (<section className="container">{
                isLoading
                    ? (
                        <div className="loader">
                            <span className="loader_text">Loading...</span>
                        </div>
                    )
                    : (
                        <div className="movies">
                            {
                              movies.map(movie => (
                                  <Movie
                                      key={movie.id}
                                      id={movie.id}
                                      year={movie.year}
                                      title={movie.title}
                                      summary={movie.summary}
                                      poster={movie.medium_cover_image}
                                      genres = {movie.genres}
                                      />
                              ))}
                        </div>
                    )
            }
            </section>
        );
    }
}

export default App;