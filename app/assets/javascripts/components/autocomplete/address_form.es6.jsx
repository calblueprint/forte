class AddressForm extends React.Component {

  static get propTypes() {
    return {
      getValidationState: React.PropTypes.func,
      displayErrorMessage: React.PropTypes.func,
      renderOptions: React.PropTypes.func,
      handleIntegerChange: React.PropTypes.func,
      setState: React.PropTypes.func,
      handleChange: React.PropTypes.func,
      is_stripe_address: React.PropTypes.boolean, 
    }
  }

  addState(name, value) {
    if (this.props.is_stripe_address) {
      var name = "stripe_" + name;
    }
    this.props.setState({ [name]: value });
  }

  getId(name) {
    if (this.props.is_stripe_address) {
      return "stripe_" + name;
    } else{
      return name;
    }
  }

  handleAddressChange(event) {
    const { setState, handleChange } = this.props;

    function fillInAddress() {
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        postal_code: 'short_name'
      };

      var place = autocomplete.getPlace();

      if (!this.props.is_stripe_address) {
        var lat = place["geometry"]["location"]["lat"]();
        var lng = place["geometry"]["location"]["lng"]();
        setState({ lat: lat, lng: lng });        
      }


      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      var street_number, street_name, setStateId;
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          switch(addressType) {
            case "administrative_area_level_1":
              val = STATES.indexOf(val);
              document.getElementById(this.getId(addressType)).value = val;
              this.addState("state", val);
              break;
            case "street_number":
              street_number = val;
              break;
            case "route":
              street_name = val;
              break;
            case "locality":
              document.getElementById(this.getId(addressType)).value = val;
              this.addState("city", val);
              break;
            case "postal_code":
              document.getElementById(this.getId(addressType)).value = val;
              this.addState("zipcode", val);
              break;
          }
        }
      }
      if (street_number && street_name) {
        val = street_number + " " + street_name;
        document.getElementById(this.getId("address")).value = val;
        this.addState("address", val)
      }
    }

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById(this.getId("address")));
    this.geolocate(autocomplete);
    autocomplete.addListener("place_changed", fillInAddress.bind(this));
    handleChange(event);
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate(autocomplete) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  render () {
    const { 
      getValidationState,
      displayErrorMessage,
      renderOptions, 
      id,
    } = this.props;

    return (
      <div>
        <FormGroup validationState={getValidationState(this.getId("address"))}>
          <ControlLabel>Address</ControlLabel>
          <FormControl
            componentClass="input"
            placeholder="Address"
            id={this.getId("address")}
            name={this.getId("address")}
            onChange={(event) => this.handleAddressChange(event)} />
          {displayErrorMessage(this.getId("address"))}
        </FormGroup>

        <FormGroup validationState={getValidationState(this.getId("address2"))}>
          <ControlLabel>Address Line 2 (optional)</ControlLabel>
          <FormControl
            componentClass="input"
            placeholder="Address Line 2"
            name={this.getId("address2")}
            onChange={(event) => this.handleChange(event)}/>
          {displayErrorMessage(this.getId("address2"))}
        </FormGroup>

        <div className="form-row">
          <FormGroup validationState={getValidationState(this.getId("city"))}>
            <ControlLabel>City</ControlLabel>
            <FormControl
              componentClass="input"
              placeholder="City"
              name={this.getId("city")}
              id={this.getId("locality")}
              onChange={(event) => this.handleChange(event)}/>
            {displayErrorMessage(this.getId("city"))}
          </FormGroup>

          <FormGroup validationState={getValidationState(this.getId("state"))}>
            <ControlLabel>State</ControlLabel>
            <FormControl
              componentClass="select"
              name="state"
              id={this.getId("administrative_area_level_1")}
              onChange={(event) => handleIntegerChange(event)}>
              <option value="" disabled selected>Select your state</option>
              {renderOptions("state")}
            </FormControl>
          {displayErrorMessage(this.getId("state"))}
          </FormGroup>

          <FormGroup validationState={getValidationState(this.getId("zipcode"))}>
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl
              componentClass="input"
              placeholder="Zip Code"
              name={this.getId("zipcode")}
              id={this.getId("postal_code")}
              onChange={(event) => this.handleChange(event)}/>
            {displayErrorMessage(this.getId("zipcode"))}
          </FormGroup>
        </div>
      </div>
    );
  }
}
