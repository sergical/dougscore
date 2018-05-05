import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { PacmanLoader } from "react-spinners";
import { load } from "../helpers/spreadsheet";
import Car from "./Car";
import "./CarList.css";

import NotFound from "./not-found.gif";

const PAGE_LIMIT = 20;

const sortOptions = [
  { value: "score", label: "DougScore" },
  { value: "wTotal", label: "Weekend Score" },
  { value: "dTotal", label: "Daily Score" }
];

class CarList extends Component {
  state = {
    loading: true,
    error: null,
    cars: [],
    page: 0,
    pageCount: 0,
    search: "",
    sort: sortOptions[0]
  };

  componentDidMount() {
    console.log("MOUNTED!!!");
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.start);
  }

  start = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: "AIzaSyC1bxZaTOj6Nu8otaC-teW1Tb5anLaAG2E",
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest"]
      })
      .then(() => {
        // 3. Initialize and make the API request.
        load(this.onLoad);
      });
  };

  onLoad = (data, error) => {
    if (data) {
      const page = this.state.page;
      this.setState({
        cars: data.cars,
        currentResults: data.cars.slice(page, PAGE_LIMIT),
        pageCount: data.cars.length / PAGE_LIMIT,
        loading: false
      });
    } else {
      this.setState({ error, loading: false });
    }
  };

  handlePageClick = data => {
    const selected = data.selected;
    const searchValue = this.state.search;
    const filteredCars = this.state.cars.sort(
      (a, b) => b[this.state.sort.value] - a[this.state.sort.value]
    );
    const searchResults = this.findMatches(searchValue, filteredCars);
    this.setState({
      currentResults: searchResults.slice(
        selected * PAGE_LIMIT,
        selected * PAGE_LIMIT + PAGE_LIMIT
      ),
      page: selected
    });
  };

  handleSearch = e => {
    const searchValue = e.target.value;
    const filteredCars = this.state.cars.sort(
      (a, b) => b[this.state.sort.value] - a[this.state.sort.value]
    );
    const searchResults = this.findMatches(searchValue, filteredCars);
    this.setState({
      page: 0,
      offset: 0,
      pageCount: Math.ceil(searchResults.length / PAGE_LIMIT),
      currentResults: searchResults.slice(0, PAGE_LIMIT),
      search: searchValue
    });
  };

  findMatches = (wordToMatch, cars) => {
    return cars.filter(car => {
      const regex = new RegExp(wordToMatch, "gi");
      return car.name.match(regex);
    });
  };

  handleSortChange = selected => {
    const cars = this.state.cars.sort(
      (a, b) => b[selected.value] - a[selected.value]
    );
    const searchResults = this.findMatches(this.state.search, cars);
    this.setState({
      cars,
      currentResults: searchResults.slice(
        this.state.page * PAGE_LIMIT,
        this.state.page * PAGE_LIMIT + PAGE_LIMIT
      ),
      sort: selected
    });
  };

  renderCarList = () => {
    return (
      <ul className="car-list">
        {this.state.currentResults.length ? (
          this.state.currentResults.map((car, i) => (
            <Car
              key={i}
              car={car}
              sortOption={this.state.sort.value}
              search={this.state.search}
            />
          ))
        ) : (
          <div className="no-results">
            <h2>Looks like there aren't any cars that match your search</h2>
            <img src={NotFound} alt="No Results" />
          </div>
        )}
      </ul>
    );
  };

  render() {
    return this.state.loading ? (
      <div className="Loading">
        <PacmanLoader color={"#6aa84f"} loading={this.state.loading} />
      </div>
    ) : this.state.error ? (
      <div>{this.state.error}</div>
    ) : (
      <div className="CarList">
        <div className="filters">
          <div className="filter-wrapper search">
            <span className="filter-label">Search:</span>{" "}
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Start typing a car name..."
              value={this.state.search}
              onChange={e => this.handleSearch(e)}
            />
          </div>
          <div className="filter-wrapper">
            <span className="filter-label">Sort By:</span>{" "}
            <Select
              options={sortOptions}
              className="filter"
              isClearable={false}
              value={this.state.sort}
              onChange={this.handleSortChange}
            />
          </div>
        </div>
        {this.renderCarList()}
        <ReactPaginate
          previousLabel={
            <span role="img" aria-labelledby="Arrow backward">
              ◀️
            </span>
          }
          nextLabel={
            <span role="img" aria-labelledby="Arrow forward">
              ▶️
            </span>
          }
          breakLabel={
            <a href="" onClick={e => e.preventDefault()}>
              ...
            </a>
          }
          breakClassName={"break-me"}
          forcePage={this.state.page}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default CarList;
