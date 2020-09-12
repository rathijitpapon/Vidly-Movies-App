import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: {
      path: "title",
      order: "asc"
    }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ 
      movies: movies,
      genres: genres,
      selectedGenre: genres[0]
     });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if(e.response && e.response.status === 404)
        toast.error("This movie has already been deleted!");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  }; 

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  }

  getPagedData = () => {
    let filtered = this.state.movies;
    if (this.state.searchQuery) {
      filtered = this.state.movies.filter(
        m => m.title.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    }
    else if(this.state.selectedGenre && this.state.selectedGenre.name !== "All Genres") {
      filtered = this.state.movies.filter(m => m.genre._id === this.state.selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [this.state.sortColumn.path], [this.state.sortColumn.order]);

    const movies = paginate(sorted, this.state.currentPage, this.state.pageSize);

    return { totalCount: filtered.length, data: movies };
  }

  render() {
    const { user } = this.props;
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup 
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">

          {user && 
          <Link 
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>}

          <p>Showing {totalCount} movies in the database.</p>

          <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
          
          <MoviesTable 
            movies={movies}
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          
          <Pagination 
          itemsCount={totalCount} 
          pageSize={this.state.pageSize} 
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange} 
          />
        </div>

        
      </div>
    );
  }
}

export default Movies;
