import React from 'react';
import { Link } from 'param-store';
import PlaceItemSearch from './PlaceItemSearch';
import GooglePlaces from 'react-google-places-component';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

searchByGeolocation(){
  const self = this;
  navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords)
  var lat = position.coords.latitude
  var long = position.coords.longitude
  APIKEY = ''

  const latlng = {lat: Number(lat), lng: Number(long)}
  const geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location':latlng}, function(results, status){
    console.log("no current error");

    if (results[0].formatted_address){
      self.setState({query:results[0].formatted_address})
    }
  })
 });
}

  render() {
    return (
      <div className="body-color">
        <div className="container">
          <nav>
            <Link href="index.html"
              className="nav-text cancel"
              params={{ path: 'index' }} >
              Cancel
            </Link>
          </nav>
          <input id="address-2"
            onChange={(e) => this.setState({query: e.target.value})}
            type="text"
            placeholder="Address or zip"
            name="address-2"
            data-name="Address 2"
            className="w-input input"
          />

          <img
           onClick={() => this.searchByGeolocation()}
           alt="target icon"
           src="images/input-icon.svg"
           className="address-icon"/>

          {
            this.state.query
              ? null
              : <div className="address-prompt">Type your address or zip</div>
          }
          <div className="address-container">
            <div className="dates-container">
              <GooglePlaces
                options={{ input: this.state.query }}
                itemProps={{ onClick: this.props.setAddress }}
                itemComponent={PlaceItemSearch} />
            </div>
          </div>
        </div>
      </div>
      );
  }
}

Search.propTypes = {
  setAddress: React.PropTypes.func,
};
