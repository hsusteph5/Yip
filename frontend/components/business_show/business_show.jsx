import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import CategoriesContainer from '../search/categories_container';
import titleize  from 'titleize';
import { createRatingStars, parsingPrice, businessCategories, parsingCity, parsingStreet } from '../../util/parsing_manager.jsx'
import googleMap from '../../../app/assets/images/google-map.png';
import ReviewIndex from '../review/review_index';
import createDollarWords from '../../util/creatingicons.jsx';



class BusinessShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    }
    this.businessCategories = this.businessCategories.bind(this);
    this.createDollars = this.createDollars.bind(this);
    this.searchBusinesses = this.searchBusinesses.bind(this);
    this.reviewForm = this.reviewForm.bind(this);
  }
  //fetches the business by category
  //then pushes to the new url
  //must fetch the business {name: category}
  searchBusinesses(category){
    return (e) => {
      e.preventDefault();
      this.setState({name: category});
      this.props.fetchBusinesses(this.state)
      .then(() => this.props.history.push({pathname:'/businesses', search: `?name=${this.state.name}`}));
    }
  }

  businessCategories(categories){
    return categories.map((category, idx) => {
      if(idx !== categories.length - 1) {
        return (
          <li key={idx} className="businessCategories" onClick={this.searchBusinesses(category)}>
            { titleize(category) },
          </li>);
        } else {
          return (
            <li key={idx} className="businessCategories" onClick={this.searchBusinesses(category)}>
              { titleize(category) }
            </li>);
          }
        }
      );
    }

  componentDidMount() {
    let int = parseInt(this.props.match.params.businessId);
    this.props.fetchBusiness(int);
  }

  createDollars() {
    if(this.props.business.price === 1) {
      return (
        <li>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign grey-dollar"></i>
          <i className="fas fa-dollar-sign grey-dollar"></i>
          <i className="fas fa-dollar-sign grey-dollar"></i>
        </li>
      );
    } else if (this.props.business.price === 2){
      return (
        <li>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign grey-dollar"></i>
          <i className="fas fa-dollar-sign grey-dollar"></i>
        </li>
      );
    } if(this.props.business.price === 3) {
      return (
        <li>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign grey-dollar"></i>
        </li>
      );
    } else if (this.props.business.price === 4){
      return (
        <li>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign green-dollar"></i>
          <i className="fas fa-dollar-sign green-dollar"></i>
        </li>
      );
    }
  }

  reviewForm(e){
    e.preventDefault;
    this.props.history.push(`/businesses/${this.props.business.id}/writeareview`);
  }

  render() {
    let images;
    // let images = (this.props.business) ? (<img src={this.props.business.photoUrls[0]}></img>) : ("")
    let businessInfo;
    let businessAddress;
    let dollars;
    let dollarsInfo;
    let reviewIndex;
    if (this.props.business){
      dollars = this.createDollars();
      dollarsInfo = createDollarWords(this.props.business.price);
      reviewIndex = (
        <div>
          <ReviewIndex users={this.props.users} reviews={this.props.reviews} currentUserId={this.props.currentUserId}/>
        </div>
      )
      businessInfo = (
        <div>
          <ul className="business-show-list">
            <li><h1>{this.props.business.name}</h1></li>
            <li className="show-stars-alignment">{createRatingStars(this.props.business.avg_rating)}<span>{this.props.reviews.length} Reviews</span></li>
            <li className="business-price">{parsingPrice(this.props.business.price)}</li>
            {this.businessCategories(this.props.business.categories)}
          </ul>
        </div>
      );
      businessAddress = (
        <ul>
          <li><img src={googleMap}></img></li>
          <li className="show-address"><i className="fas fa-map-marker-alt"></i>{parsingStreet(this.props.business.address)}</li>
          <li className="show-address"><span className="extra-padding-marker"></span>{parsingCity(this.props.business.address)}</li>
          <li className="show-phone"><i className="fas fa-phone"></i>{this.props.business.phone}</li>
          <li className="show-link"><i className="fas fa-external-link-alt"></i><a target="_blank" href={`http://${this.props.business.url}`}>{this.props.business.url}</a></li>
        </ul>
      );
      images = (
        <div>
          { this.props.business.photoUrls.map((url, idx) => <img key={idx} src={url} style={{width: 225, height: 220, "objectFit": "cover"}}></img>) }
        </div>
      );
    }
    return (
      <div>
        <div className="business-nav-background">
          <div className="business-nav-container">
            <NavBarContainer />
          </div>
        </div>


        <div className="background-categories-container">
          <CategoriesContainer />
          <button className="categories-write-review" onClick={this.reviewForm}>
              <i className="fas fa-pencil-alt"></i>
              Write a Review
          </button>
        </div>


        <div className="background-business-show-info-container">
          <div className="business-show-header">

            <div className="business-show-info-container">
              <div className="business-show-info">
                { businessInfo }
              </div>
              <button className="business-show-review" onClick={this.reviewForm}><i className="fas fa-star"></i>Write a Review</button>

            </div>

            <div className="show-images-reel">
              <div className="business-address">
                { businessAddress }

              </div>
              { images }

            </div>



          </div>
        </div>

        <div className="show-page-content-margin">
          <div className="show-page-content-container">
            <div className="review-index-container">
              { reviewIndex }
            </div>
            <div>
              <div className="health-score-info">
                <ul className="health-icon-list">
                  <li><i className="far fa-clock"></i></li>
                  <li><i className="fas fa-utensils"></i></li>
                  { dollars }
                  <li><i className="far fa-plus-square"></i></li>

                </ul>
                <ul className="health-icon-list-info">
                  <li><span>Today <span className="bold-health">12:00pm - 10:00pm</span></span></li>
                  <li><span className="bold-health blue-health">Full Menu</span></li>
                  { dollarsInfo }
                  <li><span><span className="bold-health blue-health">Health Score</span> 100 out of 100</span></li>


                </ul>
              </div>
            </div>

          </div>


        </div>
      </div>
    );
  }
}

export default BusinessShow;
