import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { putBoardInfo, getBoardInfo } from '../../actions/boardinfo';
import update from 'react-addons-update';

//new forms are a combination of add and update
export class NewDailyForm extends Component {
    state = {
        room_name: '', resolution: '1200x825', refresh_rate:'60', message: '',
        id: this.props.boardUpdateNumber,
        index: [0, 1, 2, 3, 4, 5, 6, 7],
        timeArr: ["8:00-8:50", "9:00-9:50", "10:00-10:50", "11:00-11:50", "12:00-12:50", "1:00-1:50", "2:00-2:50", "3:00-3:50"],
        daily: ['', '', '', '', '', '', '', ''],
    };

    static propTypes = {
        putBoardInfo: PropTypes.func.isRequired,
        getBoardInfo: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getBoardInfo();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onArrChange = e => {
        const arr_name = e.target.name;
        const i = parseInt(e.target.id);
        const up_d = e.target.value;
        switch (arr_name) {
            case "daily":
                this.setState(update(this.state, { daily: { [i]: { $set: up_d } } }));
                break;
            default:
                console.log(`Unknown Modal Type of ${arr_name}`);
        }
    }

    onSubmit = e => {
        e.preventDefault();
        var { id, refresh_rate, message, daily } = this.state;
        const { room_name, resolution } = this.state;
        const type = 'daily';
        const isSetup = true;
        //combine the different days and times
        const time_string = "Time ;" + "8:00-8:50 ;" + "9:00-9:50 ;" + "10:00-10:50 ;" + "11:00-11:50 ;" + "12:00-12:50 ;" + "1:00-1:50 ;" + "2:00-2:50 ;" + "3:00-3:50 ;";
        const day = "Today ;" + daily[0] + " ;" + daily[1] + " ;" + daily[2] + " ;" + daily[3] + " ;" + daily[4] + " ;" + daily[5] + " ;" + daily[6] + " ;" + daily[7] + " ;"
        message = time_string + day;
        const d_message = message;
        id = parseInt(id);
        refresh_rate = parseInt(refresh_rate);
        const boardinfo = { id, room_name, resolution, refresh_rate, isSetup, message, d_message, type };
        this.props.putBoardInfo(boardinfo);
        this.props.setModalClosed();
    }


    render() {
        const { id, room_name, resolution, refresh_rate, daily, index, timeArr } = this.state;
        var i;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Provision Daily Board</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Board ID {id}</label>
                    </div>

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
                        <label>Resolution</label><br />
                        <select name="resolution" value={resolution} onChange={this.onChange}>
                            <option value="1200x825">1200x825</option>
                            <option value="test value">Test Value</option>
                        </select>
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

                    <div className="container">
                        <div className="row">
                            <div className="form-group col-md-2">
                                <label>Time</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label>Daily</label>
                            </div>

                        </div>

                        {index.map((i) =>
                            <div key={i} className="row">
                                <div className="form-group col-md-2">
                                    <label>{timeArr[i]}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <input className="form-control" type="text" id={String(i)} name='daily' onChange={this.onArrChange}
                                        value={this.state.daily[i]} maxLength="15" />
                                </div>
                            </div>
                        )}
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

export default connect(mapStateToProps, { getBoardInfo, putBoardInfo })(NewDailyForm);
