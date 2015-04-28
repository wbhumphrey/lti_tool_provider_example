XmlBuilder.Placements.MessageChoice = React.createClass({
    render: function() {
        if (this.props.messages) {
            var messages = this.props.messages;
            var title = this.props.title
            return (
                <select name="test" id="test">
                    {messages.map(function(message){
                        return (<option name={ title + ' Message Type' } value={ message } >{ message }</option>);
                    })}
                </select>
            );
        }
        else {
            return false;
        }
    }
});
