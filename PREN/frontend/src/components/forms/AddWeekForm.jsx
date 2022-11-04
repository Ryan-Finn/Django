import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBoardInfo } from '../../actions/boardinfo';
import update from 'react-addons-update';


export class AddWeekForm extends Component {
    state = {
        room_name: '', resolution: '1200x825', message: '',
        index: [0, 1, 2, 3, 4, 5, 6, 7],
        timeArr: ["8:00-8:50", "9:00-9:50", "10:00-10:50", "11:00-11:50", "12:00-12:50", "1:00-1:50", "2:00-2:50", "3:00-3:50"],
        monday: ['', '', '', '', '', '', '', ''],
        tuesday: ['', '', '', '', '', '', '', ''],
        wednesday: ['', '', '', '', '', '', '', ''],
        thursday: ['', '', '', '', '', '', '', ''],
        friday: ['', '', '', '', '', '', '', ''],
    };



    static propTypes = {
        addBoardInfo: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    //2D arrays are overly complicated so we decided to keep it 1D so this will handel the types with a switch
    onArrChange = e => {
        const arr_name = e.target.name;
        const i = parseInt(e.target.id);
        const up_d = e.target.value;
        switch (arr_name) {
            case "monday":
                this.setState(update(this.state, { monday: { [i]: { $set: up_d } } }));
                break;
            case "tuesday":
                this.setState(update(this.state, { tuesday: { [i]: { $set: up_d } } }));
                break;
            case "wednesday":
                this.setState(update(this.state, { wednesday: { [i]: { $set: up_d } } }));
                break;
            case "thursday":
                this.setState(update(this.state, { thursday: { [i]: { $set: up_d } } }));
                break;
            case "friday":
                this.setState(update(this.state, { friday: { [i]: { $set: up_d } } }));
                break;
            default:
                console.log(`Unknown Array Type of ${arr_name}`);
        }
    }

    onSubmit = e => {
        //sumit code
        e.preventDefault();
        var { message, monday, tuesday, wednesday, thursday, friday } = this.state
        //get the values from the current state
        const { room_name, resolution } = this.state;
        const type = 'week';
        //combine the different days and times
        const time_string = "Time ;" + "8:00-8:50 ;" + "9:00-9:50 ;" + "10:00-10:50 ;" + "11:00-11:50 ;" + "12:00-12:50 ;" + "1:00-1:50 ;" + "2:00-2:50 ;" + "3:00-3:50 ;";
        const monday_m = "Monday ;" + monday[0] + " ;" + monday[1] + " ;" + monday[2] + " ;" + monday[3] + " ;" + monday[4] + " ;" + monday[5] + " ;" + monday[6] + " ;" + monday[7] + " ;"
        const tuesday_m = "Tuesday ;" + tuesday[0] + " ;" + tuesday[1] + " ;" + tuesday[2] + " ;" + tuesday[3] + " ;" + tuesday[4] + " ;" + tuesday[5] + " ;" + tuesday[6] + " ;" + tuesday[7] + " ;"
        const wednesday_m = "Wednesday ;" + wednesday[0] + " ;" + wednesday[1] + " ;" + wednesday[2] + " ;" + wednesday[3] + " ;" + wednesday[4] + " ;" + wednesday[5] + " ;" + wednesday[6] + " ;" + wednesday[7] + " ;";
        const thursday_m = "Thursday ;" + thursday[0] + " ;" + thursday[1] + " ;" + thursday[2] + " ;" + thursday[3] + " ;" + thursday[4] + " ;" + thursday[5] + " ;" + thursday[6] + " ;" + thursday[7] + " ;"
        const friday_m = "Friday ;" + friday[0] + " ;" + friday[1] + " ;" + friday[2] + " ;" + friday[3] + " ;" + friday[4] + " ;" + friday[5] + " ;" + friday[6] + " ;" + friday[7] + " ;"
        message = time_string + monday_m + tuesday_m + wednesday_m + thursday_m + friday_m;
        const w_message = message;
        //set the new board container to the state values
        const boardinfo = { room_name, resolution, message, w_message, type };
        this.props.addBoardInfo(boardinfo);
        this.props.setModalClosed();
    }

    render() {
        const { index, timeArr, room_name, resolution, monday, tuesday, wednesday, thursday, friday} = this.state
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
                                <label>Monday</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label>Tuesday</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label>Wednesday</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label>Thursday</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label>Friday</label>
                            </div>

                        </div>

                        {index.map((i) =>
                            <div key={i} className="row">
                                <div className="form-group col-md-2">
                                    <label>{timeArr[i]}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <input className="form-control" type="text" id={String(i)} name='monday' onChange={this.onArrChange} value={this.state.monday[i]} maxlength="15"/>
                                </div>
                                <div className="form-group col-md-2">
                                    <input className="form-control" type="text" id={String(i)} name='tuesday' onChange={this.onArrChange} value={this.state.tuesday[i]} maxlength="15"/>
                                </div>
                                <div className="form-group col-md-2">
                                    <input className="form-control" type="text" id={String(i)} name='wednesday' onChange={this.onArrChange} value={this.state.wednesday[i]} maxlength="15"/>
                                </div>
                                <div className="form-group col-md-2">
                                    <input className="form-control" type="text" id={String(i)} name='thursday' onChange={this.onArrChange} value={this.state.thursday[i]} maxlength="15"/>
                                </div>
                                <div className="form-group col-md-2">
                                    <input className="form-control" type="text" id={String(i)} name='friday' onChange={this.onArrChange} value={this.state.friday[i]} maxlength="15"/>
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

export default connect(null, { addBoardInfo })(AddWeekForm);
