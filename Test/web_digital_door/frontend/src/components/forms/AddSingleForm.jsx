import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBoardInfo } from '../../actions/boardinfo';


export class AddForm extends Component {
    state = {
        room_name: '',
        resolution: '1200x825',
        message: ''
    };

    static propTypes = {
        addBoardInfo: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        //sumit code
        e.preventDefault();
        //get the values from the current state
        const { room_name, resolution, message } = this.state;
        const type = 'basic';
        //set the new board container to the state values
        const s_message = message;
        const boardinfo = { room_name, resolution, message, s_message, type };
        this.props.addBoardInfo(boardinfo);
        this.props.setModalClosed();
    }

    render() {
        const { room_name, resolution, message } = this.state
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Board</h2>
                <form onSubmit={this.onSubmit} id="add-form">
                    <div className="form-group">
                        <label>Room Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="room_name"
                            onChange={this.onChange}
                            value={room_name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Resolution</label><br/>
                        <select name="resolution" value={resolution} onChange={ this.onChange}>
                            <option value="1200x825">1200x825</option>
                            <option value="test value">Test Value</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="message"
                            onChange={this.onChange}
                            value={message}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { addBoardInfo })(AddForm);
