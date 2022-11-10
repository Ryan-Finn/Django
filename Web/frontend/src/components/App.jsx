import React, { Component, Fragment } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import './main.css'

import ReactDom from 'react-dom';
import Header from './layout/Header.jsx';
import Alerts from './layout/Alerts.jsx';

import Dashboard from './boards/Dashboard.jsx';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';
import store from '../store';


//main app container
class App extends Component {
    // Provider lets us have access to our store anywhere in the app
    // This is the start of the html 
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <div></div>
                    <Header />
                    <ToastContainer autoClose={2000} />
                    <div className="container">
                        <Dashboard />
                    </div>
                    <div className='demo-app'>
                        <div className='demo-app-main'>
                            {this.renderSidebar()}
                            <FullCalendar
                                plugins={[ dayGridPlugin, interactionPlugin ]}
                                eventContent={renderEventContent}
                                dateClick={this.handleDateClick}
                                initialView="dayGridMonth"
                                weekends={false}
                                selectable={true}
                                selectMirror={true}
                                events={[
                                    { title: 'event 1', date: '2022-10-10', textColor: 'black' },
                                    { title: 'event 2', date: '2022-10-11' }
                                ]}
                            />
                        </div>
                    </div>
                </Fragment>
            </Provider>
        )
    }

    //when a date is clicked, will output an alert of the date
    handleDateClick = (arg) => { // bind with an arrow function
//         alert(arg.dateStr)
        toast.success(arg.dateStr)
    }

    renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox' //I think everything props is depricated, need to figure out alternative
                            checked={this.props.weekendsVisible}
                            onChange={this.props.toggleWeekends}
                        />
                        Toggle weekends
                    </label>
                </div>
          </div>
        )
    }
}

//Changes how our events are output
function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

// Rendering it out as a component 
ReactDom.render(<App />, document.getElementById('app'))