import React from 'react';
import ReviewHeader from './ReviewHeader/ReviewHeader.jsx';
import ReviewList from './ReviewList/ReviewList.jsx';
import Footer from './Footer/Footer.jsx';
import axios from 'axios';
import restaurantData from '../../restaurantData.js';

let axios_url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3200' : 'https://reviews-footer.herokuapp.com'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviewData: [],
      restaurantData: {}
    }
    this.getReviewsForRestaurantID = this.getReviewsForRestaurantID.bind(this);
    this.getRestaurantDataByRestaurantID = this.getRestaurantDataByRestaurantID.bind(this);
    this.sortReviews = this.sortReviews.bind(this);
  }

  componentDidMount() {
    this.getReviewsForRestaurantID();
  }

  getReviewsForRestaurantID() {
    let id = window.location.href.split("id=")[1];
    // console.log(id); //undefined
    // let url = window.location.href;

    // axios.get(`${axios_url}/restaurants/api/reviews/${id}`)
    axios.get(`restaurants/api/reviews/1`)

    // axios.get(url+'api/reviews')
      .then( data => {
        this.sortReviews('Most recent', data.data);
      })
      .catch(err => console.log('Error getting review data: ',err));
  }

  getRestaurantDataByRestaurantID(data) {
    //get the restaurant id by looking at the restaurantID of the first review (assuming there is at least one review)
    if (data.length > 0) {
      let id = data[0].restaurantID;
      //loop over restaurant data to find the restaurant that matches the id
      for (let i = 0; i < restaurantData.length; i++) {
        if (id === restaurantData[i].id) {
          return restaurantData[i];
        }
      }
    } else {
      return {};
    }
  }

  sortReviews(method, data = this.state.reviewData) {
    if (method === 'Most recent') {
      let sortedReviewData = data.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      })
      let restaurantData = this.getRestaurantDataByRestaurantID(sortedReviewData);
      this.setState({reviewData: sortedReviewData, restaurantData: restaurantData})

    } else if (method === 'Highest rated') {
      //sort this.state.reviewData by starRating
      let sortedReviewData = data.sort(function(a,b){
        return b.starRating - a.starRating;
      })
      this.setState({reviewData: sortedReviewData})
    }
  }

  render() {
    return (
      <div>
        <ReviewHeader restaurantData={this.state.restaurantData}/>
        <ReviewList reviewData={this.state.reviewData} sortReviews={this.sortReviews} restaurantData={this.state.restaurantData}/>
        <Footer />
      </div>
    )
  }
}

export default App;