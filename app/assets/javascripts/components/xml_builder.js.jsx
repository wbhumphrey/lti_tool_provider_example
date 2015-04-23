var XmlBuilder = React.createClass({

  propTypes: {
    placements: React.PropTypes.array,
    baseUrl: React.PropTypes.string
  },

  getInitialState: function() {
    return {xmlUrl: this.props.baseUrl}
  },

  componentDidMount: function() {
    this.formChangeHandler();
  },

  formChangeHandler: function () {
    this.setState({xmlUrl: this.props.baseUrl + "?" + $(this.refs.xmlForm.getDOMNode()).serialize() });
  },

  xmlUrlClickHandler: function (e) {
    e.target.setSelectionRange(0, e.target.value.length)
  },

  render: function () {
    var formChangeHandler = this.formChangeHandler;
    return (
      <div className="container">
        <h2 className="text-center">XML Builder</h2>

        <p>
          <p><span style={{'font-weight': 'bold'}}>Consumer key:</span> 'key'</p>
          <p><span style={{'font-weight': 'bold'}}>Consumer secret:</span> 'secret'</p>
          <label htmlFor="xml-uri">XML URL:</label>
          <input onClick={this.xmlUrlClickHandler} style={{cursor: 'text'}} ref="xmlUrl" id="xml-url" value={this.state.xmlUrl} className="form-control form-read-only" readOnly type="text"/>
        </p>

        <form ref="xmlForm" onChange={this.formChangeHandler} method="post">
          <XmlBuilder.Placements ref="placements" placements={this.props.placements}><strong>Select which Placements you
            would like to enable</strong></XmlBuilder.Placements>
          <XmlBuilder.Options ref="ltiOptions"><strong>Set values for width and height</strong></XmlBuilder.Options>
          <XmlBuilder.CustomParams ref="customParams" onFormChange={formChangeHandler} ><strong>Specify Custom Params</strong></XmlBuilder.CustomParams>
        </form>
      </div>
    );
  }

});