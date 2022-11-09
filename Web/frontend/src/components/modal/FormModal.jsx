import React from 'react';
import Modal from 'react-modal';
import './modal.scss';

//simple form container
export default function FormModal({ modalOpen, setModalClosed, displayForm }) {

    return (
        <>
            <Modal className="modal_form_content" overlayClassName="modal_form_overlay" isOpen={modalOpen} onRequestClose={setModalClosed} ariaHideApp={false}>
                <div>
                    {/* passes in a form to be displayed */}
                    {displayForm}
                    {/* can also pass through functions */}
                    <button onClick={setModalClosed} className="btn btn-danger btn-sm">Close</button>
                </div>
            </Modal>
        </>
    );
}