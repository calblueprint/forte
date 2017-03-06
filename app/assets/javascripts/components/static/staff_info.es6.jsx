class StaffInfo extends React.Component {
  
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      person: React.PropTypes.object,
    };
  }

  render() {
    const { person } = this.props;
    const popover = (
      <Popover id="popover-positioned-top" title={`${person.name} | ${person.position}`}>
        {person.bio}
      </Popover>
    ) 

    return(
      <div className="section__individual-container">
        <OverlayTrigger id="popover-positioned-top" trigger={['hover', 'focus']} placement="top" overlay={popover}>
          <img className="section__image" src={person.image} href="#" />
        </OverlayTrigger>
        <div className="section__person-info">
          <h4 className="section__name">
            {person.name}
          </h4>
          <h5 className="section__position">
            {person.position}
          </h5>
        </div>
      </div>
    );
  }
}
