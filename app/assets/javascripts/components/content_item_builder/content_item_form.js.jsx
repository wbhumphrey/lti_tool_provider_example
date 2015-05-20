ContentItemBuilder.ContentItemForm = React.createClass({

  propTypes: {
    data: React.PropTypes.string,
    returnUrl: React.PropTypes.string,
    ltiVersion: React.PropTypes.string,
    contentItems: React.PropTypes.object,
    ltiMsg: React.PropTypes.string,
    ltiLog: React.PropTypes.string,
    ltiErrorMsg: React.PropTypes.string,
    LtiErrorLog: React.PropTypes.string
  },


  render: function () {
    return (
      <form ref="contentItemForm" action={this.props.returnUrl} method="post">
        <input type="hidden" name="lti_message_type" value="ContentItemSelection"/>
        <input type="hidden" name="lti_version" value={this.props.ltiVersion}/>
        <input type="hidden" name="data" value={this.props.data}/>
        <input type="hidden" name="content_items" value={this.props.contentItems}/>
        <input type="hidden" name="lti_msg" value={this.props.ltiMsg}/>
        <input type="hidden" name="lti_log" value={this.props.ltiLog}/>
        <input type="hidden" name="lti_errormsg" value={this.props.ltiErrorMsg}/>
        <input type="hidden" name="lti_errorlog" value={this.props.ltiErrorLog}/>
      </form>
    );
  },

  //called from parent via ref attribute
  submit: function() {
    React.findDOMNode(this.refs.contentItemForm).submit();
  }

});