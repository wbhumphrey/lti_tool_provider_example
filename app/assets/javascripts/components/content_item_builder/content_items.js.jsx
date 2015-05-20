ContentItemBuilder.ContentItems = React.createClass({

  propTypes: {
    initialContentItems: React.PropTypes.array,
    ltiLaunchUrl: React.PropTypes.string,
    textFileUrl: React.PropTypes.string,
    documentTargets: React.PropTypes.array
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

  itemTemplate: function (type) {
    var retVal = {};
    switch (type) {
      case "LtiLink":
        retVal.url = '';
        retVal.type = '';
        retVal.mediaType = '';
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
            key={index}
            index={index}
            documentTargets={documentTargets}
            itemTitle={contentItem.itemTitle}
            itemText={contentItem.itemText}
            itemType={contentItem.itemType}
            itemWidth={contentItem.itemWidth}
            itemHeight={contentItem.itemHeight}
            itemPresentTarget={contentItem.itemPresentTarget}
            itemWindowTarget={contentItem.itemWindowTarget}
            />
        })}
        </tbody>
      </table>
    );
  },


  //called from parent via ref attribute
  toJSON: function () {
    var items = this.state.contentItems.map(function (contentItem) {
      return {
        "@type": this.itemTemplate(contentItem.type).type,
        "@id": this.itemTemplate(contentItem.type).url,
        "url": this.itemTemplate(contentItem.type).url,
        "title": contentItem.title,
        "text": contentItem.text,
        "mediaType": this.itemTemplate(contentItem.type).mediaType,
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