ContentItemBuilder.ContentItems.Row = React.createClass({

  propTypes: {
    onRowDelete: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    documentTargets: React.PropTypes.array.isRequired,
    itemTitle: React.PropTypes.string,
    itemText: React.PropTypes.string,
    itemType: React.PropTypes.string,
    itemWidth: React.PropTypes.string,
    itemHeight: React.PropTypes.string,
    itemPresentTarget: React.PropTypes.string,
    itemWindowTarget: React.PropTypes.string
  },

  removeHandler: function () {
    var index = React.findDOMNode(this.refs.index).value.trim();
    this.props.onRowDelete(Number(index));
  },

  render: function () {
    var documentTargets = this.props.documentTargets;
    return (
      <tr>
        <td><input ref="itemTitle" defaultValue={this.props.itemTitle} type="text"></input></td>
        <td><input ref="itemText" defaultValue={this.props.itemText} type="text"></input></td>
        <td>
          <select ref="itemType" id="itemType">
            <option value="textFile">Text File</option>
            <option value="ltiLink">LTI Link</option>
          </select>
        </td>
        <td>
          <select ref="itemPresentTarget" id="itemPresentTarget">
            {documentTargets.map(function (value) {
              return <option key={value} value={value}>{value}</option>
            })};
          </select>
        </td>
        <td><input ref="itemWindowTarget" defaultValue={this.props.itemWindowTarget} type="text"></input></td>
        <td className="add-remove-col">
          <input type="hidden" ref="index" value={this.props.index}></input>
          <a href="#" onClick={this.removeHandler}>
            <span className="glyphicon glyphicon-minus remove-icon"></span>
          </a>
        </td>
      </tr>
    );
  }

});