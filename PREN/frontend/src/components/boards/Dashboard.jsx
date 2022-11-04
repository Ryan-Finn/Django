import React, { Fragment, useState } from 'react';
import Boards from './Boards.jsx';
import Info from './Info.jsx'

//base class used for displaying primary components
export default function Dashboard() {
    return (
        <Fragment>
            <Boards />
            <Info />
        </Fragment>
    )
}
