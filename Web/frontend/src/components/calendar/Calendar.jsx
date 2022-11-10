import React, { Component } from 'react';
import { createSelector } from 'reselect'
import { connect } from 'react-redux';
import FullCalendar, { formatDate }  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import actionCreators from '../../actions/calendarinfo';
import { getHashValues } from '../../actions/utils';
import './calendar.scss';
import { getEvents } from '../../actions/calendarInfoNew';

//eeeeeeeeeeeeeeeeeeeeeeeeeeeeee


//base class used for displaying primary components
class Calendar extends Component {

    render() {
        return (
            <div className='demo-app'>
                <div className='demo-app-main'>
                    {this.renderSidebar()}
                    <FullCalendar
                        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                        headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.props.weekendsVisible}
                        datesSet={this.handleDates}
                        select={this.handleDateSelect}
                        events={this.props.events}
                        eventClick={this.handleEventClick}
                        eventContent={renderEventContent} // custom render function
                        eventAdd={this.handleEventAdd}
                        eventRemove={this.handleEventRemove}
                        eventChange={this.handleEventChange} // called for drag-n-drop/resize
                    />
                </div>
            </div>
        )
    }

    renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2><b style={{color:"white"}}>Instructions</b></h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div>
          <label>
            <div className='input-section'>
                <div>
                    <input className='toggle'
                    type='checkbox'
                    checked={this.props.weekendsVisible}
                    onChange={this.props.toggleWeekends}
                    />
                </div>
                <div>
                    - Toggle weekends
                </div>
            </div>
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2><b style={{color:"white"}}>All Events ({this.props.events.length})</b></h2>
          <ul>
            {this.props.events.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

    //when a date is clicked, will output an alert of the date
    handleDateSelect = (selectInfo) => { // bind with an arrow function
        let calendarApi = selectInfo.view.calendar
        let title = prompt('Please enter a new title for your event')

        calendarApi.unselect() // clear date selection

        if (title) {
          calendarApi.addEvent({ // will render immediately. will call handleEventAdd
              title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: false
            }, true) // temporary=true, will get overwritten when reducer gives new events
        }
    }

    handleEventAdd = (addInfo) => {
        this.props.createEvent(addInfo.event.toPlainObject())
            .catch(() => {
            // reportNetworkError()
            addInfo.revert()
            })
        this.renderSidebar()
    }

    handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove() // will render immediately. will call handleEventRemove
        }
      }

    handleDates = (rangeInfo) => {
        this.props.getEvents(rangeInfo.startStr, rangeInfo.endStr)
      }

      handleEventRemove = (removeInfo) => {
        this.props.deleteEvent(removeInfo.event.id)
          .catch(() => {
            // reportNetworkError()
            removeInfo.revert()
          })
      }

      handleEventChange = (changeInfo) => {
        this.props.updateEvent(changeInfo.event.toPlainObject())
          .catch(() => {
            // reportNetworkError()
            changeInfo.revert()
          })
      }
  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

}

function mapStateToProps() {
    const getEventArray = createSelector(
      (state) => state.eventsById,
      getHashValues
    )
  
    return (state) => {
      return {
        events: getEventArray(state),
        weekendsVisible: state.weekendsVisible
      }
    }
  }

  //Changes how our events are output
  function renderEventContent(eventInfo) {
    return (
      <div>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    )
  }

  function renderSidebarEvent(plainEventObject) {
    return (
      <li key={plainEventObject.id}>
        <b>{formatDate(plainEventObject.start, {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}) + " " } 
         - { formatDate(plainEventObject.end, {hour: '2-digit', minute: '2-digit'})}</b>
        <br></br>
        <i>{plainEventObject.title}</i>
      </li>
    )
  }

export default connect(mapStateToProps, {actionCreators, getEvents})(Calendar)
