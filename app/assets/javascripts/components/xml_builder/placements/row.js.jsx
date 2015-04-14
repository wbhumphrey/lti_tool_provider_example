XmlBuilder.Placements.Row = React.createClass({

  propTypes: {
    placementKey: React.PropTypes.string
  },

  render: function () {
    return (
      <tr>
        <td className="text-center checkbox-col">
          <label className="show">
            <input type="checkbox" name={ "placements[" + this.props.placementKey + "][enabled]"}/>
          </label>
        </td>
        <td> {this.props.children} </td>
      </tr>
    );
  }

});