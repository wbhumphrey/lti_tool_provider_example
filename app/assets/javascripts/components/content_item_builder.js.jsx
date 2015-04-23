var ContentItems = React.createClass({

  propTypes: {
    data: React.PropTypes.string,
    returnUrl: React.PropTypes.string,
    ltiVersion: React.PropTypes.string,
    ltiLaunchUrl: React.PropTypes.string,
    documentTargets: React.PropTypes.array
  },

  getInitialState: function () {
    return {
      contentItems: "",
      ltiMsg: "",
      ltiLog: "",
      ltiErrorMsg: "",
      ltiErrorlog: "",
      contentItems: {
        "@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
        "@graph": [{
          "@type": "LtiLink",
          "@id": this.props.ltiLaunchUrl,
          "url": this.props.ltiLaunchUrl,
          "title": "Test Lti Tool",
          "mediaType": "application/vnd.ims.lti.v1.ltilink",
          "placementAdvice": {
            "displayWidth": 800,
            "presentationDocumentTarget": 'iframe',
            "displayHeight": 600
          }
        }]
      }
    };
  },

  formChangeHandler: function (e) {
    var state = {};
    state[e.target.id] = e.target.value;
    setState(state);
  },

  contentItemChangeHandler: function (e) {
    var contentItem = this.state.contentItems["@graph"][0]
    var contentItemType = React.findDOMNode(this.refs.contentItemType);
    var documentTarget = React.findDOMNode(this.refs.documentTarget);
    contentItem["@type"] = contentItemType.options[contentItemType.selectedIndex].value;
    contentItem.title = React.findDOMNode(this.refs.contentItemTitle).value;
    contentItem.placementAdvice.displayWidth = React.findDOMNode(this.refs.contentItemWidth).value;
    contentItem.placementAdvice.displayHeight = React.findDOMNode(this.refs.contentItemHeight).value;
    contentItem.placementAdvice.presentationDocumentTarget = documentTarget.options[documentTarget.selectedIndex].value;
    this.setState({
      contentItems: {
        "@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
        "@graph": [contentItem]
      }
    });
  },

  formSubmitHandler: function () {
    React.findDOMNode(this.refs.contentItemForm).submit();
  },

  render: function () {
    var contentItem = this.state.contentItems['@graph'][0];
    var documentTargets = this.props.documentTargets;
    return (
      <div>
        <form ref="contentItemForm" action={this.props.returnUrl} method="post">
          <input type="hidden" name="lti_message_type" value="ContentItemSelection"/>
          <input type="hidden" name="lti_version" value={this.props.ltiVersion}/>
          <input type="hidden" name="data" value={this.props.data}/>
          <input type="hidden" name="content_items" value={JSON.stringify(this.state.contentItems)}/>
          <input type="hidden" name="lti_msg" value={this.state.ltiMsg}/>
          <input type="hidden" name="lti_log" value={this.state.ltiLog}/>
          <input type="hidden" name="lti_errormsg" value={this.state.ltiErrorMsg}/>
          <input type="hidden" name="lti_errorlog" value={this.state.ltiErrorLog}/>
        </form >
        <table>
          <tbody>
          <tr>
            <td>
              <label htmlFor="contentItemTitle">Title</label>
            </td>
            <td>
              <input ref="contentItemTitle" onChange={this.contentItemChangeHandler} id="contentItemTitle"
                     value={contentItem.title} type="text"/>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="contentItemType">Content Item</label></td>
            <td>
              <select ref="contentItemType" selected={contentItem['@type']}
                      onChange={this.contentItemChangeHandler} id="contentItemType">
                <option value="LtiLink">LTI Link</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="documentTarget">Content Item</label></td>
            <td>
              <select selected={contentItem.placementAdvice.presentationDocumentTarget}
                      onChange={this.contentItemChangeHandler} ref="documentTarget" id="documentTarget">
                {documentTargets.map(function (value) {
                  return <option value={value}>{value}</option>
                })};
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="contentItemHeight">Height</label>
            </td>
            <td>
              <input ref="contentItemHeight" onChange={this.contentItemChangeHandler} id="contentItemHeight" type="
                     number"
                     value={contentItem.placementAdvice.displayHeight}/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="contentItemWidth">Width</label>
            </td>
            <td>
              <input ref="contentItemWidth" onChange={this.contentItemChangeHandler} id="contentItemWidth" type="
                     number"
                     value={contentItem.placementAdvice.displayWidth}/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="ltiLog">LTI Log</label>
            </td>
            <td>
              <input onChange={this.formChangeHandler} value={this.state.ltiLog} id="ltiLog" type="text"/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="ltiMsg">LTI Message</label>
            </td>
            <td>
              <input onChange={this.formChangeHandler} value={this.state.ltiMsg} id="ltiMsg" type="text"/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="ltiErrorMsg">LTI Error Message</label>
            </td>
            <td>
              <input onChange={this.formChangeHandler} value={this.state.ltiErrorMsg} id="ltiErrorMsg" type="text"/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="ltiErrorLog">LTI Error Log</label>
            </td>
            <td>
              <input onChange={this.formChangeHandler} value={this.state.ltiErrorLog} id="ltiErrorLog" type="text"/>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={this.formSubmitHandler} type="button">Submit</button>
            </td>
          </tr>
          </tbody>
        </table >
      </div>

    );
  }
});