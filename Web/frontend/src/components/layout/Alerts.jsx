import React, { Component, Fragment } from 'react';
// import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired

    }

    //used to generate popup error messages
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.room_name) alert.error(`Room Name: ${error.msg.room_name.join()}`);
            if (error.msg.resolution) alert.error(`Resolution: ${error.msg.resolution.join()}`);
            if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
        }

        if (message !== prevProps.message) {
            if (message.deleteBoard) alert.success(message.deleteBoard);
            if (message.addBoard) alert.success(message.addBoard);
            if (message.updateBoard) alert.success(message.updateBoard);
        }
        
    }


    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

// export default connect(mapStateToProps)(withAlert()(Alerts));