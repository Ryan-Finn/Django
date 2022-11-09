import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBoardInfo } from '../../actions/boardinfo';
import update from 'react-addons-update';

export class AddDailyForm extends Component {
    state = {
        room_name: '', resolution: '1200x825', message: '',
        daily: ['', '', '', '', '', '', '', ''],
        index: [0, 1, 2, 3, 4, 5, 6, 7],
        timeArr: ["8:00-8:50", "9:00-9:50", "10:00-10:50", "11:00-11:50", "12:00-12:50", "1:00-1:50", "2:00-2:50", "3:00-3:50"],
    };

    //make sure boardinfo is linked
    static propTypes = {
        addBoardInfo: PropTypes.func.isRequired
    }

    //update function for basic non-array form inputs
    onChange = e => this.setState({ [e.target.name]: e.target.value })

    //update function for array based changes
    onArrChange = e => {
        const arr_name = e.target.name;
        const i = parseInt(e.target.id);
        const up_d = e.target.value;
        //console.log(arr_name);
        switch (arr_name) {
            case "daily":
                this.setState(update(this.state, { daily: { [i]: { $set: up_d } } }));
                break;
            default:
                console.log(`Unknown Modal Type of ${arr_name}`);

        }
    }

    //form submiit function
    onSubmit = e => {
        //sumit code
        e.preventDefault();
        var { message, daily} = this.state
        //get the values from the current state
        const { room_name, resolution } = this.state;
        const type = 'daily';
        const time_string = "Time ;" + "8:00-8:50 ;" + "9:00-9:50 ;" + "10:00-10:50 ;" + "11:00-11:50 ;" + "12:00-12:50 ;" + "1:00-1:50 ;" + "2:00-2:50 ;" + "3:00-3:50 ;";
        const day = "Today ;" + daily[0] + " ;" + daily[1] + " ;" + daily[2] + " ;" + daily[3] + " ;" + daily[4] + " ;" + daily[5] + " ;" + daily[6] + " ;" + daily[7] + " ;"
        message = time_string + day;
        const d_message = message;
        //set the new board container to the state values
        const boardinfo = { room_name, resolution, message, d_message, type };
        this.props.addBoardInfo(boardinfo);
        this.props.setModalClosed();
    }

    render() {
        const { room_name, resolution, daily, index, timeArr } = this.state
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
                        <label>Resolution</label><br />
                        <select name="resolution" value={resolution} onChange={this.onChange}>
                            <option value="1200x825">1200x825</option>
                            <option value="test value">Test Value</option>
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

                        {/* map is used for mapping arrays and props to the form to reduce code clutter */}
                        {index.map((i) =>
                            <div key={i} className="row">
                                <div className="form-group col-md-2">
                                    <label>{timeArr[i]}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <input className="form-control" type="text" id={String(i)} name='daily' onChange={this.onArrChange} value={this.state.daily[i]} maxlength="15"/>
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

export default connect(null, { addBoardInfo })(AddDailyForm);
