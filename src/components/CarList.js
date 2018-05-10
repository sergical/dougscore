import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { PacmanLoader } from 'react-spinners';
import { load } from '../helpers/spreadsheet';
import Car from './Car';
import CarFilters from './CarFilters';
import BestOfEach from './BestOfEach';
import './CarList.css';

import NotFound from './not-found.gif';

const PAGE_LIMIT = 20;

const SORT_OPTIONS = [
  { value: 'score', label: '✅ DougScore' },
  { value: 'wTotal', label: '🏖️ Weekend Score' },
  { value: 'dTotal', label: '🏢 Daily Score' },
  { value: 'wStyling', label: '💅🏼 Styling' },
  { value: 'wAccel', label: '🏎️ Acceleration' },
  { value: 'wHandling', label: '↪️ Handling' },
  { value: 'wFun', label: '😂 Fun Factor' },
  { value: 'wCool', label: '🆒 Cool Factor' },
  { value: 'dFeatures', label: '🎮 Features' },
  { value: 'dComfort', label: '🛋️ Comfort' },
  { value: 'dQuality', label: '👩🏼‍🔬 Quality' },
  { value: 'dPracticality', label: '🛄 Practicality' },
  { value: 'dValue', label: '💰 Value' },
];

const FILTER_OPTIONS = [
  { value: 10, option: 'wStyling', label: '💅🏼 Styling' },
  { value: 10, option: 'wAccel', label: '🏎️ Acceleration' },
  { value: 10, option: 'wHandling', label: '↪️ Handling' },
  { value: 10, option: 'wFun', label: '😂 Fun Factor' },
  { value: 10, option: 'wCool', label: '🆒 Cool Factor' },
  { value: 10, option: 'dFeatures', label: '🎮 Features' },
  { value: 10, option: 'dComfort', label: '🛋️ Comfort' },
  { value: 10, option: 'dQuality', label: '👩🏼‍🔬 Quality' },
  { value: 10, option: 'dPracticality', label: '🛄 Practicality' },
  { value: 10, option: 'dValue', label: '💰 Value' },
];

class CarList extends Component {
  state = {
    loading: true,
    error: null,
    cars: [],
    page: 0,
    pageCount: 0,
    search: '',
    results: 0,
    sort: SORT_OPTIONS[0],
    selectedCars: [],
    comparing: false,
    open: false,
    filterOptions: FILTER_OPTIONS,
  };

  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load('client', this.start);
  }

  onLoad = (data, error) => {
    if (data) {
      const { page } = this.state;
      this.setState({
        cars: data.cars,
        results: data.cars.length,
        currentResults: data.cars.slice(page, PAGE_LIMIT),
        pageCount: data.cars.length / PAGE_LIMIT,
        loading: false,
      });
    } else {
      this.setState({ error, loading: false });
    }
  };

  start = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: 'AIzaSyC1bxZaTOj6Nu8otaC-teW1Tb5anLaAG2E',
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest'],
      })
      .then(() => {
        // 3. Initialize and make the API request.
        load(this.onLoad);
      });
  };

  selectCar = (e, car) => {
    const { selectedCars } = this.state;
    if (selectedCars.indexOf(car) === -1) {
      selectedCars.push(car);
    } else {
      selectedCars.splice(selectedCars.indexOf(car), 1);
      if (!selectedCars.length) {
        this.setState({ comparing: false });
      }
    }
    this.setState({ selectedCars });
  };

  handlePageClick = data => {
    const { selected } = data;
    const searchValue = this.state.search;
    const filteredCars = this.state.cars.sort((a, b) => b[this.state.sort.value] - a[this.state.sort.value]);
    const searchResults = this.findMatches(searchValue, filteredCars);
    const filters = this.state.filterOptions;
    const filteredArray = searchResults.filter(
      car =>
        car.wStyling <= filters.find(option => option.option === 'wStyling').value &&
        car.wAccel <= filters.find(option => option.option === 'wAccel').value &&
        car.wHandling <= filters.find(option => option.option === 'wHandling').value &&
        car.wFun <= filters.find(option => option.option === 'wFun').value &&
        car.wCool <= filters.find(option => option.option === 'wCool').value &&
        car.dFeatures <= filters.find(option => option.option === 'dFeatures').value &&
        car.dComfort <= filters.find(option => option.option === 'dComfort').value &&
        car.dQuality <= filters.find(option => option.option === 'dQuality').value &&
        car.dPracticality <= filters.find(option => option.option === 'dPracticality').value &&
        car.dValue <= filters.find(option => option.option === 'dValue').value
    );
    this.setState({
      currentResults: filteredArray.slice(selected * PAGE_LIMIT, selected * PAGE_LIMIT + PAGE_LIMIT),
      page: selected,
    });
  };

  handleSearch = e => {
    const searchValue = e.target.value;
    const filteredCars = this.state.cars.sort((a, b) => b[this.state.sort.value] - a[this.state.sort.value]);
    const searchResults = this.findMatches(searchValue, filteredCars);
    const filters = this.state.filterOptions;
    const filteredArray = searchResults.filter(
      car =>
        car.wStyling <= filters.find(option => option.option === 'wStyling').value &&
        car.wAccel <= filters.find(option => option.option === 'wAccel').value &&
        car.wHandling <= filters.find(option => option.option === 'wHandling').value &&
        car.wFun <= filters.find(option => option.option === 'wFun').value &&
        car.wCool <= filters.find(option => option.option === 'wCool').value &&
        car.dFeatures <= filters.find(option => option.option === 'dFeatures').value &&
        car.dComfort <= filters.find(option => option.option === 'dComfort').value &&
        car.dQuality <= filters.find(option => option.option === 'dQuality').value &&
        car.dPracticality <= filters.find(option => option.option === 'dPracticality').value &&
        car.dValue <= filters.find(option => option.option === 'dValue').value
    );
    this.setState({
      page: 0,
      results: filteredArray.length,
      pageCount: Math.ceil(filteredArray.length / PAGE_LIMIT),
      currentResults: filteredArray.slice(0, PAGE_LIMIT),
      search: searchValue,
    });
  };

  filter = (filterItem, value) => {
    // Current sort & search state results
    const searchValue = this.state.search;
    const filteredCars = this.state.cars.sort((a, b) => b[this.state.sort.value] - a[this.state.sort.value]);
    const searchResults = this.findMatches(searchValue, filteredCars);
    console.log(FILTER_OPTIONS);
    // Updated the filter first
    const filters = this.state.filterOptions;
    const updatedFilterOptions = filters.map(filterOption => {
      if (filterOption.option === filterItem) {
        filterOption.value = value;
      }
      return filterOption;
    });
    // Now lets filter out those results

    const filteredArray = searchResults.filter(
      car =>
        car.wStyling <= updatedFilterOptions.find(option => option.option === 'wStyling').value &&
        car.wAccel <= updatedFilterOptions.find(option => option.option === 'wAccel').value &&
        car.wHandling <= updatedFilterOptions.find(option => option.option === 'wHandling').value &&
        car.wFun <= updatedFilterOptions.find(option => option.option === 'wFun').value &&
        car.wCool <= updatedFilterOptions.find(option => option.option === 'wCool').value &&
        car.dFeatures <= updatedFilterOptions.find(option => option.option === 'dFeatures').value &&
        car.dComfort <= updatedFilterOptions.find(option => option.option === 'dComfort').value &&
        car.dQuality <= updatedFilterOptions.find(option => option.option === 'dQuality').value &&
        car.dPracticality <= updatedFilterOptions.find(option => option.option === 'dPracticality').value &&
        car.dValue <= updatedFilterOptions.find(option => option.option === 'dValue').value
    );

    this.setState({
      page: 0,
      results: filteredArray.length,
      pageCount: Math.ceil(filteredArray.length / PAGE_LIMIT),
      currentResults: filteredArray.slice(0, PAGE_LIMIT),
      filterOptions: updatedFilterOptions,
    });
  };

  findMatches = (wordToMatch, cars) =>
    cars.filter(car => {
      const regex = new RegExp(wordToMatch, 'gi');
      return car.name.match(regex);
    });

  handleSortChange = selected => {
    const cars = this.state.cars.sort((a, b) => b[selected.value] - a[selected.value]);
    const searchResults = this.findMatches(this.state.search, cars);

    const filters = this.state.filterOptions;
    const filteredArray = searchResults.filter(
      car =>
        car.wStyling <= filters.find(option => option.option === 'wStyling').value &&
        car.wAccel <= filters.find(option => option.option === 'wAccel').value &&
        car.wHandling <= filters.find(option => option.option === 'wHandling').value &&
        car.wFun <= filters.find(option => option.option === 'wFun').value &&
        car.wCool <= filters.find(option => option.option === 'wCool').value &&
        car.dFeatures <= filters.find(option => option.option === 'dFeatures').value &&
        car.dComfort <= filters.find(option => option.option === 'dComfort').value &&
        car.dQuality <= filters.find(option => option.option === 'dQuality').value &&
        car.dPracticality <= filters.find(option => option.option === 'dPracticality').value &&
        car.dValue <= filters.find(option => option.option === 'dValue').value
    );

    this.setState({
      cars,
      currentResults: filteredArray.slice(this.state.page * PAGE_LIMIT, this.state.page * PAGE_LIMIT + PAGE_LIMIT),
      sort: selected,
    });
  };

  compare = () => {
    const comparingState = this.state.comparing;
    this.setState({ comparing: !comparingState });
  };

  clearList = () => {
    this.setState({
      comparing: false,
      selectedCars: [],
    });
  };

  clearFilters = () => {
    const searchValue = this.state.search;
    const filteredCars = this.state.cars.sort((a, b) => b[this.state.sort.value] - a[this.state.sort.value]);
    const searchResults = this.findMatches(searchValue, filteredCars);
    // Now lets filter out those results
    const updatedFilterOptions = this.state.filterOptions.map(filterOption => {
      filterOption.value = 10;
      return filterOption;
    });
    const filteredArray = searchResults.filter(
      car =>
        car.wStyling <= updatedFilterOptions.find(option => option.option === 'wStyling').value &&
        car.wAccel <= updatedFilterOptions.find(option => option.option === 'wAccel').value &&
        car.wHandling <= updatedFilterOptions.find(option => option.option === 'wHandling').value &&
        car.wFun <= updatedFilterOptions.find(option => option.option === 'wFun').value &&
        car.wCool <= updatedFilterOptions.find(option => option.option === 'wCool').value &&
        car.dFeatures <= updatedFilterOptions.find(option => option.option === 'dFeatures').value &&
        car.dComfort <= updatedFilterOptions.find(option => option.option === 'dComfort').value &&
        car.dQuality <= updatedFilterOptions.find(option => option.option === 'dQuality').value &&
        car.dPracticality <= updatedFilterOptions.find(option => option.option === 'dPracticality').value &&
        car.dValue <= updatedFilterOptions.find(option => option.option === 'dValue').value
    );

    this.setState({
      page: 0,
      results: filteredArray.length,
      pageCount: Math.ceil(filteredArray.length / PAGE_LIMIT),
      currentResults: filteredArray.slice(0, PAGE_LIMIT),
      filterOptions: updatedFilterOptions,
    });
  };

  renderFullList = () => (
    <div className="CarList">
      <div className="filters">
        <div className="filter-wrapper search">
          <span className="filter-label">Search:</span>{' '}
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
          <span className="filter-label">Sort By:</span>{' '}
          <Select
            options={SORT_OPTIONS}
            className="filter"
            isClearable={false}
            value={this.state.sort}
            onChange={this.handleSortChange}
          />
        </div>
        <div className="filter-wrapper">
          <button className="filter-button" onClick={() => this.setState({ open: !this.state.open })}>
            {this.state.open ? 'Close' : 'Open'} Filters
          </button>
        </div>
      </div>
      <h4 style={{ textAlign: `center` }}>Total Cars: {this.state.results}</h4>
      <div className="list-and-filters">
        {this.renderCarList()}
        <CarFilters
          open={this.state.open}
          filterOptions={this.state.filterOptions}
          filter={this.filter}
          clearFilters={this.clearFilters}
        />
      </div>

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
        breakLabel={<button onClick={e => e.preventDefault()}>...</button>}
        breakClassName="break-me"
        forcePage={this.state.page}
        pageCount={this.state.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={this.handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );

  renderCarList = () => (
    <ul className="car-list">
      {this.state.currentResults.length ? (
        this.state.currentResults.map(car => (
          <Car
            key={car.name}
            car={car}
            sortOption={this.state.sort.value}
            search={this.state.search}
            selectCar={this.selectCar}
            selected={this.state.selectedCars.indexOf(car) !== -1}
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

  renderCompareList = () => (
    <div>
      <ul className="car-list">
        {this.state.selectedCars.map(car => (
          <Car
            key={car.name}
            car={car}
            sortOption={this.state.sort.value}
            search={this.state.search}
            selectCar={this.selectCar}
            selected={this.state.selectedCars.indexOf(car) !== -1}
          />
        ))}
      </ul>
      {this.state.selectedCars.length ? <BestOfEach selectedCars={this.state.selectedCars} /> : null}
    </div>
  );

  render() {
    if (this.state.loading) {
      return (
        <div className="Loading">
          <PacmanLoader color="#6aa84f" loading={this.state.loading} />
        </div>
      );
    }
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    return (
      <div>
        {!this.state.comparing ? this.renderFullList() : this.renderCompareList()}
        {this.state.selectedCars.length ? (
          <div className="comparing-buttons">
            <button className="main" onClick={() => this.compare()}>
              {this.state.comparing ? 'Cancel' : 'Compare'}
            </button>
            <button onClick={() => this.clearList()}>Clear List</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CarList;
