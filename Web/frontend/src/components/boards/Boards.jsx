import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBoardInfo, deleteBoardInfo } from '../../actions/boardinfo';
import Modal from 'react-modal';
import AddForm from '../forms/AddSingleForm.jsx';
import AddDailyForm from '../forms/AddDailyForm.jsx';
import AddWeekForm from '../forms/AddWeekForm.jsx';

import UpdateForm from '../forms/UpdateSingleForm.jsx';
import UpdateDailyForm from '../forms/UpdateDailyForm.jsx';
import WeekForm from '../forms/UpdateWeekForm.jsx';

import NewSingleForm from '../forms/NewSingleForm.jsx';
import NewDailyForm from '../forms/NewDailyForm.jsx';
import NewWeekForm from '../forms/NewWeekForm.jsx';

import FormModal from '../modal/FormModal.jsx'
import PreviewModal from '../modal/PreviewModal.jsx'

import './boards.scss'



export class Boards extends Component {
    //state variables for all the primary pop-ups and messages
    state = {
        openAddSingleModal: false, openAddDailyModal: false, openAddWeekModal: false,
        openNewSingleModal: false, openNewDailyModal: false, openNewWeekModal: false,
        openUpdateSingleModal: false, openUpdateDailyModal: false, openUpdateWeekModal: false,
        openUpdateButtonModal: false, openPreviewModal: false, openChooseFormModal: false, openNewChoose: false,
        openNewSingleModal: false,
        previewMessage: "",
        dailyMessage: ['', '', '', '', '', '', '', ''],
        m_Message: ['', '', '', '', '', '', '', ''],
        tu_Message: ['', '', '', '', '', '', '', ''],
        w_Message: ['', '', '', '', '', '', '', ''],
        th_Message: ['', '', '', '', '', '', '', ''],
        f_Message: ['', '', '', '', '', '', '', ''],

        refresh_r: '60',
        boardUpdateNumber: 0,
        boardFlag: '',
        boardID: 0
    }

    //the main update function that allows for state variables to load messages
    onUpdateButton = (boardinfo) => {
        var i;
        var temp;
        var msg = ['', '', '', '', '', '', '', ''];
        var msg_m = ['', '', '', '', '', '', '', ''];
        var msg_tu = ['', '', '', '', '', '', '', ''];
        var msg_w = ['', '', '', '', '', '', '', ''];
        var msg_th = ['', '', '', '', '', '', '', ''];
        var msg_f = ['', '', '', '', '', '', '', ''];

        this.setState({ boardUpdateNumber: boardinfo.id });
        this.setState({ refresh_r: boardinfo.refresh_rate });
        this.setState({ previewMessage: boardinfo.s_message });
        //grab all messages and generate auto fill data
        //daily parse
        if (boardinfo.d_message != '') {
            temp = boardinfo.d_message.split(' ;');
            for (i = 0; i < 8; i++) {
                msg[i] = temp[i + 10];
            }
        }

        //if it is empty then set it to an empty msg
        this.setState({ dailyMessage: msg });    

        //weekly parse
        if (boardinfo.w_message != '') {
            temp = boardinfo.w_message.split(' ;');
            for (i = 0; i < 8; i++) {
                msg_m[i] = temp[i + 10];
                msg_tu[i] = temp[i + 19];
                msg_w[i] = temp[i + 28];
                msg_th[i] = temp[i + 37];
                msg_f[i] = temp[i + 46];
            }
        }
        
        this.setState({ m_Message: msg_m });
        this.setState({ tu_Message: msg_tu });
        this.setState({ w_Message: msg_w });
        this.setState({ th_Message: msg_th });
        this.setState({ f_Message: msg_f });

        this.setState({ openUpdateButtonModal: true });
    }

    //set the state variables to allow for the preview modal
    onPreview = (msg, id) => {
        this.setState({ previewMessage: msg });
        this.setState({ boardID: id });
        this.setState({ openPreviewModal: true });
    }

    //modal or popup handler function
    onFormModal = (typ) => {
        this.onCloseModal()
        switch (typ) {
            case "ChooseForm":
                this.setState({ openChooseFormModal: true });
                break;

            //Add
            case "AddSingleBoard":
                this.setState({ openAddSingleModal: true });
                break;
            case "AddDailyBoard":
                this.setState({ openAddDailyModal: true });
                break;
            case "AddWeekBoard":
                this.setState({ openAddWeekModal: true });
                break;

            //New
            case "NewSingleBoard":
                this.setState({ openNewSingleModal: true });
                break;
            case "NewDailyBoard":
                this.setState({ openNewDailyModal: true });
                break;
            case "NewWeekBoard":
                this.setState({ openNewWeekModal: true });
                break;

            //Update
            case "UpdateSingleBoard":
                this.setState({ openUpdateSingleModal: true });
                break;
            case "UpdateDailyBoard":
                this.setState({ openUpdateDailyModal: true })
                break;
            case "UpdateWeekBoard":
                this.setState({ openUpdateWeekModal: true });
                break;
            default:
                console.log(`Unknown Modal Type of ${typ}`);

        }
    }

    //set the state variables to allow for provisioning 
    onProvision = (id) => {
        this.setState({ boardUpdateNumber: id})
        this.setState({ openNewChoose: true });
    }

    //close all modals to make sure no errors occur
    onCloseModal = () => {
        //add modals
        this.setState({ openAddSingleModal: false });
        this.setState({ openAddDailyModal: false });
        this.setState({ openAddWeekModal: false });

        //new or provisioning modals
        this.setState({ openNewSingleModal: false });
        this.setState({ openNewDailyModal: false });
        this.setState({ openNewWeekModal: false });

        //update modals
        this.setState({ openUpdateSingleModal: false });
        this.setState({ openUpdateDailyModal: false });
        this.setState({ openUpdateWeekModal: false });

        //all other modals
        this.setState({ openUpdateButtonModal: false });
        this.setState({ openPreviewModal: false })
        this.setState({ openChooseFormModal: false });
        this.setState({ openNewChoose: false });
    }

    //preset inherited props
    static propTypes = {
        boardinfo: PropTypes.array.isRequired,
        getBoardInfo: PropTypes.func.isRequired,
        deleteBoardInfo: PropTypes.func.isRequired
    };

    //used to make sure boardinfo is connected with redux
    componentDidMount() {
        this.props.getBoardInfo();
    }

    // This is absolutely disgusting, revolting. This can't be how this shit is to be done
    //main view function that contains all rendered attributes
    render() {
        return (
            <Fragment>

                <h2>Boards</h2>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ROOM NAME</th>
                            <th>RESOLUTION</th>
                            <th>REFRESH RATE</th>
                            <th>MESSAGE</th>
                            <th><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" className="bi bi-battery-charging" viewBox="0 0 16 16">
                                <path d="M9.585 2.568a.5.5 0 0 1 .226.58L8.677 6.832h1.99a.5.5 0 0 1 .364.843l-5.334 5.667a.5.5 0 0 1-.842-.49L5.99 9.167H4a.5.5 0 0 1-.364-.843l5.333-5.667a.5.5 0 0 1 .616-.09z" />
                                <path d="M2 4h4.332l-.94 1H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.38l-.308 1H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                                <path d="M2 6h2.45L2.908 7.639A1.5 1.5 0 0 0 3.313 10H2V6zm8.595-2-.308 1H12a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9.276l-.942 1H12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.405z" />
                                <path d="M12 10h-1.783l1.542-1.639c.097-.103.178-.218.241-.34V10zm0-3.354V6h-.646a1.5 1.5 0 0 1 .646.646zM16 8a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z" />
                            </svg></th>
                            <th> </th>
                            <th>
                                <button className="btn btn-secondary btn-sm" onClick={() => this.onFormModal("ChooseForm")}>
                                    ADD&nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>

                                </button>
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.boardinfo.map((boardinfo) => (
                            <tr key={boardinfo.id}>
                                <td>{boardinfo.id}</td>
                                <td>{boardinfo.room_name}</td>
                                <td>{boardinfo.resolution}</td>

                                {/* Conditional rendering for the ammount of time in seconds */}
                                {boardinfo.refresh_rate == 60 &&
                                    <td>1-MINUTE</td>
                                }
                                {boardinfo.refresh_rate == 900 &&
                                    <td>15-MINUTES</td>
                                }
                                {boardinfo.refresh_rate == 1800 &&
                                    <td>30-MINUTES</td>
                                }
                                {boardinfo.refresh_rate == 3600 &&
                                    <td>1-HOUR</td>
                                }

                                <td><button onClick={() => this.onPreview(boardinfo.message, boardinfo.id)}
                                    className="btn btn-secondary btn-sm">
                                    {' '}
                                    Preview
                                </button></td>
                                
                                {/* Currently not implimented */}
                                <td>{boardinfo.battery_status}</td>
                                
                                {/* Using the board.isSetup to determine if an item should be rendered */}
                                {boardinfo.isSetup &&
                                    <td><button onClick={() => this.onUpdateButton(boardinfo)}
                                        className="btn btn-success btn-sm">
                                        {' '}
                                        Update
                                    </button></td>
                                }

                                {!boardinfo.isSetup &&
                                    <td><button onClick={() => this.onProvision(boardinfo.id)}
                                    className="btn btn-warning btn-sm">
                                        {' '}
                                        Provision
                                    </button></td>
                                }
                                

                                <td><button onClick={this.props.deleteBoardInfo.bind(this, boardinfo.id)}
                                    className="btn btn-danger btn-sm">
                                    {' '}
                                    Delete
                                </button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* form choice modal for the add button*/}
                <Modal className="modal_content" overlayClassName="modal_overlay" isOpen={this.state.openChooseFormModal} onRequestClose={this.onCloseModal} ariaHideApp={false}
                    size="sm" aria-labelledby="contained-modal-title-vcenter">
                    <h1>Choose Form</h1>
                    <div>
                        <button onClick={() => this.onFormModal("AddSingleBoard")} className="btn btn-success btn-sm btn_self">Single Message</button>
                        <button onClick={() => this.onFormModal("AddDailyBoard")} className="btn btn-success btn-sm btn_self">Daily Layout</button>
                        <button onClick={() => this.onFormModal("AddWeekBoard")} className="btn btn-success btn-sm btn_self">Week Layout</button>
                        <br />
                        <button onClick={this.onCloseModal} className="btn btn-danger btn-sm">Close</button>
                    </div>
                </Modal>

                {/* form choice modal for the provision button*/}
                <Modal className="modal_content" overlayClassName="modal_overlay" isOpen={this.state.openNewChoose} onRequestClose={this.onCloseModal} ariaHideApp={false}
                    size="sm" aria-labelledby="contained-modal-title-vcenter">
                    <h1>Choose Board Type</h1>
                    <div>
                        <button onClick={() => this.onFormModal("NewSingleBoard")} className="btn btn-success btn-sm btn_self">Single Message</button>
                        <button onClick={() => this.onFormModal("NewDailyBoard")} className="btn btn-success btn-sm btn_self">Daily Layout</button>
                        <button onClick={() => this.onFormModal("NewWeekBoard")} className="btn btn-success btn-sm btn_self">Week Layout</button>
                        <br />
                        <button onClick={this.onCloseModal} className="btn btn-danger btn-sm">Close</button>
                    </div>
                </Modal>

                {/* form choice modal for the update button */}
                <Modal className="modal_content" overlayClassName="modal_overlay" isOpen={this.state.openUpdateButtonModal} onRequestClose={this.onCloseModal} ariaHideApp={false}
                    size="sm" aria-labelledby="contained-modal-title-vcenter">
                    <h1>Choose Form</h1>
                    <div>
                        <button onClick={() => this.onFormModal("UpdateSingleBoard")} className="btn btn-success btn-sm btn_self">Single Message</button>
                        <button onClick={() => this.onFormModal("UpdateDailyBoard")} className="btn btn-success btn-sm btn_self">Daily Layout</button>
                        <button onClick={() => this.onFormModal("UpdateWeekBoard")} className="btn btn-success btn-sm btn_self">Week Layout</button>
                        <br />
                        <button onClick={this.onCloseModal} className="btn btn-danger btn-sm">Close</button>
                    </div>
                </Modal>


                

                {/* add forms */}
                <FormModal modalOpen={this.state.openAddSingleModal} setModalClosed={this.onCloseModal} displayForm={<AddForm setModalClosed={this.onCloseModal} />} />
                <FormModal modalOpen={this.state.openAddWeekModal} setModalClosed={this.onCloseModal} displayForm={<AddWeekForm setModalClosed={this.onCloseModal} />} />
                <FormModal modalOpen={this.state.openAddDailyModal} setModalClosed={this.onCloseModal} displayForm={<AddDailyForm setModalClosed={this.onCloseModal} />} />

                {/* provision forms */}
                <FormModal modalOpen={this.state.openNewSingleModal} setModalClosed={this.onCloseModal} displayForm={<NewSingleForm boardUpdateNumber={this.state.boardUpdateNumber} setModalClosed={this.onCloseModal} />} />
                <FormModal modalOpen={this.state.openNewWeekModal} setModalClosed={this.onCloseModal} displayForm={<NewWeekForm boardUpdateNumber={this.state.boardUpdateNumber} setModalClosed={this.onCloseModal} />} />
                <FormModal modalOpen={this.state.openNewDailyModal} setModalClosed={this.onCloseModal} displayForm={<NewDailyForm boardUpdateNumber={this.state.boardUpdateNumber}  setModalClosed={this.onCloseModal} />} />
               
                {/* update forms */}
                <FormModal modalOpen={this.state.openUpdateSingleModal} setModalClosed={this.onCloseModal} displayForm={
                    <UpdateForm boardUpdateNumber={this.state.boardUpdateNumber} boardRefresh={this.state.refresh_r} boardMsg={this.state.previewMessage} setModalClosed={this.onCloseModal} />} />

                <FormModal modalOpen={this.state.openUpdateWeekModal} setModalClosed={this.onCloseModal} displayForm={<WeekForm boardUpdateNumber={this.state.boardUpdateNumber} boardRefresh={this.state.refresh_r} setModalClosed={this.onCloseModal}
                    m_boardMsg={this.state.m_Message} tu_boardMsg={this.state.tu_Message} w_boardMsg={this.state.w_Message} th_boardMsg={this.state.th_Message} f_boardMsg={this.state.f_Message} />} />

                <FormModal modalOpen={this.state.openUpdateDailyModal} setModalClosed={this.onCloseModal} displayForm={
                    <UpdateDailyForm boardUpdateNumber={this.state.boardUpdateNumber} boardRefresh={this.state.refresh_r} boardMsg={this.state.dailyMessage} setModalClosed={this.onCloseModal}/>} />

                {/* preview modal */}
                <PreviewModal modalOpen={this.state.openPreviewModal} setModalClosed={this.onCloseModal} message={this.state.previewMessage} previewID={this.state.boardID}/>
              


            </Fragment>
        )
    }
}

//function that maps the current appliication state to the local props 
const mapStateToProps = state => ({
    boardinfo: state.boardinfo.boardinfo
});

export default connect(mapStateToProps, { getBoardInfo, deleteBoardInfo })(Boards);
