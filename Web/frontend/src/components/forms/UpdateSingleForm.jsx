import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { putBoardInfo, getBoardInfo } from '../../actions/boardinfo';

export class UpdateForm extends Component {


    state = {
        id: this.props.boardUpdateNumber,
        refresh_rate: this.props.boardRefresh,
        message: this.props.boardMsg,
    };

    static propTypes = {
        putBoardInfo: PropTypes.func.isRequired,
        getBoardInfo: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getBoardInfo();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        e.preventDefault();
        var { id, refresh_rate, message } = this.state;
        const type = 'basic';
        id = parseInt(id);
        const s_message = message;
        const boardinfo = { id, refresh_rate, message, s_message, type };
        this.props.putBoardInfo(boardinfo);
        this.props.setModalClosed();
    }

    render() {
        var { id, refresh_rate, message } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Update Message</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Board ID {id}</label>

                    </div>

                    <div className="form-group">
                        <label>Refresh Rate</label><br />
                        <select name="refresh_rate" value={refresh_rate} onChange={this.onChange}>
                            <option value="60">1-Minute</option>
                            <option value="900">15-Minutes</option>
                            <option value="1800">30-Minutes</option>
                            <option value="3600">1-Hour</option>
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
                            required
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

const mapStateToProps = state => ({
    boardinfo: state.boardinfo.boardinfo
});

export default connect(mapStateToProps, { getBoardInfo, putBoardInfo })(UpdateForm);
