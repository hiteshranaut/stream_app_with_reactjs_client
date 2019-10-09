import React from 'react';
import { connect } from 'react-redux';
import Modal from '../components/Modal';
import history from '../history';
import { fetchStream , deleteStream } from '../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {


  componentDidMount() {
    console.log(this.props);
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {

    const  { id } = this.props.match.params;

    return (
        <React.Fragment>
          <button
            onClick={() => this.props.deleteStream(id) }
            className="ui button negative">
              Delete
          </button>

          <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
     );
  }

  renderContent(){
    if (!this.props.stream) {
      return 'Are you sure you want to delete this Stream?';
    }

    return `Are you sure you want to delete this Stream with title: ${this.props.stream.title}`
  }


  render() {

    return (
        <Modal
          title="DeleteStream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
         />
    );
  }

}

  const mapStateToProps = (state , ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
  };

  export default connect(mapStateToProps , { fetchStream , deleteStream })(StreamDelete);
