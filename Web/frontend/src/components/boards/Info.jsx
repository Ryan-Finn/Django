import React, { Component, Fragment, useState } from 'react';

//used to aid the user in the operation of the program
export class Info extends Component {

    render() {
        return (
            <Fragment>
                <h3>How To Use</h3>
                <p>
                    Add: grey button on the top right with the plus<br />
                    This is purely for debugging purposes. Boards will be automatically assigned an ID and will be added to the table once set up and powered on.<br /><br />
                    Preview: grey button under the message header<br />
                    This will open up a pop-up window with the rendered image displayed on the sign.<br /><br />
                    Provision: yellow button<br />
                    Provisioning will allow a user to set up a name, resolution, refresh rate, and message for the display.<br /><br />
                    Update: green button<br />
                    Updating will allow users to edit the base type of the display along with the refresh rate and message.<br /><br />
                    Delete: red button<br />
                    This button will simply remove the board from the application.<br /><br />
                </p>
            </Fragment>
        )
    }
}



export default (Info);
