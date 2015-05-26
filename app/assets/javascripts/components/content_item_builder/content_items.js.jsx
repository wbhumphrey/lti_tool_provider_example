ContentItemBuilder.ContentItems = React.createClass({

  propTypes: {
    initialContentItems: React.PropTypes.array,
    ltiLaunchUrl: React.PropTypes.string,
    textFileUrl: React.PropTypes.string,
    documentTargets: React.PropTypes.array,
    updateContentItems: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {contentItems: (this.props.initialContentItems || [])};
  },

  addRowHandler: function () {
    var contentItems = this.state.contentItems;
    contentItems.push({
      title: '',
      text: '',
      type: '',
      width: "300",
      height: "300",
      presentationTarget: '',
      windowTarget: ''
    });
    this.setState({contentItems: contentItems});
  },

  handleDelete: function (index) {
    var contentItems = this.state.contentItems;
    contentItems.splice(index, 1);
    this.setState({contentItems: contentItems, updateForm: true});
  },

  handleChange: function(index, data) {
    this.state.contentItems[index][data[0]] = data[1];
    this.props.updateContentItems();
  },

  itemTemplate: function (contentItem) {
    var retVal = this.baseContentItemJSON(contentItem);
    switch (contentItem.type) {
      case "ltiLink":
        retVal.url = this.props.ltiLaunchUrl;
        retVal.type = 'LtiLink';
        retVal.mediaType = 'application/vnd.ims.lti.v1.ltilink';
        break;
      case "textFile":
        retVal.url = this.props.textFileUrl;
        retVal.type = 'FileItem';
        retVal.mediaType = 'text/plain';
        break;
    }
    return retVal;
  },

  baseContentItemJSON: function (contentItem) {
    return {
      "title": contentItem.title,
      "text": contentItem.text,
      "placementAdvice": {
        "displayWidth": 800,
        "presentationDocumentTarget": contentItem.presentationTarget,
        "displayHeight": 600
      }
    }
  },

  render: function () {
    var contentItems = this.state.contentItems;
    var handleDelete = this.handleDelete;
    var documentTargets = this.props.documentTargets;
    var handleChange = this.handleChange;
    return (
      <table className="table table-condensed">
        <thead>
        <tr>
          <th>Title</th>
          <th>Text</th>
          <th>Type</th>
          <th>Presentation Target</th>
          <th>Window Target</th>
          <th className="add-remove-col">
            <a onClick={this.addRowHandler} href="#">
              <span className="glyphicon glyphicon-plus add-icon"> </span>
            </a>
          </th>
        </tr>
        </thead>
        <tbody>
        {contentItems.map(function (contentItem, index) {
          return <ContentItemBuilder.ContentItems.Row
            onRowDelete={handleDelete}
            onRowChange={handleChange}
            key={index}
            index={index}
            documentTargets={documentTargets}
            title={contentItem.itemTitle}
            text={contentItem.itemText}
            type={contentItem.itemType}
            width={contentItem.itemWidth}
            height={contentItem.itemHeight}
            presentationTarget={contentItem.itemPresentTarget}
            windowTarget={contentItem.itemWindowTarget}
            />
        })}
        </tbody>
      </table>
    );
  },

  setDefaultProp: function (contentItem, property, defaultValue) {
    if (!contentItem[property]) {
      contentItem[property] = defaultValue
    }
    return contentItem;
  },

  //called from parent via ref attribute
  toJSON: function () {
    var _this = this;
    var items = this.state.contentItems.map(function (contentItem) {

      contentItem = _this.setDefaultProp(contentItem, 'type', 'textFile');
      contentItem = _this.setDefaultProp(contentItem, 'presentationTarget', 'frame');

      return {
        "@type": _this.itemTemplate(contentItem).type,
        "@id": _this.itemTemplate(contentItem).url,
        "url": _this.itemTemplate(contentItem).url,
        "title": contentItem.title,
        "text": contentItem.text,
        "mediaType": _this.itemTemplate(contentItem).mediaType,
        "placementAdvice": {
          "displayWidth": 800,
          "presentationDocumentTarget": contentItem.presentationTarget,
          "displayHeight": 600
        }
      }
    });
    return {
      contentItems: {
        "@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
        "@graph": items || []
      }
    }
  }

});