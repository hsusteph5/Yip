import { connect } from 'react-redux';
import React from 'react';
// import ReviewForm from './review_form';
import { updateReview, fetchReview } from '../../actions/review_actions';
import { Link } from 'react-router-dom';
import icon from '../../../app/assets/images/user-icon.png';
import yip from '../../../app/assets/images/yip-logo.png';
import StarComponent from './star-component';


const mapStateToProps = (state, ownProps) => {
  return {
    review: state.entities.reviews[ownProps.match.params.id],
    businesses: state.entities.businesses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateReview: (review) => dispatch(updateReview(review)),
    fetchReview: (id) => dispatch(fetchReview(id))
  }
}

//need to pull the review id 
class EditReviewForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rating: "",
      description: "",
      // business_id: this.props.match.params.businessId,
      id: this.props.match.params.reviewId
    }
    this.submitReview = this.submitReview.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

//updates the local state with the description
  updateDescription(e){
    this.setState({description: e.target.value});
  }

//udpates the rating with a callback (updates the local state and also prevents
//from being clicked on)
  updateRating(rating){
    this.setState({rating: rating});
  }


//handles the actual creation of the post
//needs to push based on the url on top or else it will push with what ever is in the store
  submitReview(e){
    e.preventDefault();
    this.props.updateReview(this.state)
      .then(res => this.props.history.push(`/businesses/${res.review.business_id}`));
  }

  render(){
    //need to check if the business exists before displaying it
    let name;
    let errors;
    if (this.props.business){
      name = (
        <h1>{this.props.business[this.props.review.id].name}</h1>
      );

    }
    // debugger;
    if(this.props.errors) {
      errors = (
        <ul className="errors-create-review-form">
           { this.props.errors.map((error, idx) => <li key={idx} className="create-review-form-error"> { error }</li>) }
        </ul>
      )
    }
    return(
      <div className="create-review-form">
        <div className="create-review-form-nav-bar">
          <div className="nav-bar">
            <nav className="nav-bar-container">
              <div className="left-bar-navigation">
                <ul>
                  <li className="nav-input-size">
                      <Link to="/"><img className="business-logo" src={yip}></img></Link>
                  </li>
                </ul>
              </div>

              <div className="right-bar-navigation">
                <ul>
                    <li className="user-icon">
                        <img onClick = {() => this.props.openModal('dropdown')} src={icon}></img>
                    </li>
                    <li>

                      <div className='dropdown-button'>
                        <i className="fas fa-sort-down"></i>
                      </div>

                    </li>
                </ul>
              </div>

            </nav>
          </div>
        </div>


        <div className="create-review-form-background">
          <div>
            { errors }
          </div>

          { name }
          <form className="create-review-form-container">
            <StarComponent updateRating={this.updateRating} />

            <textarea
              placeholder="Your review helps others learn about great local busineses"
              onChange={this.updateDescription}
              value={this.state.description}
              className="review-form-description"
              >
            </textarea>

          </form>
          <button type="submit" onClick={this.submitReview} className="create-review-button">Update a Review</button>


        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm)
