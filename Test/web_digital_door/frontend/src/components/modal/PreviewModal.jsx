import React from 'react'
import Modal from 'react-modal';
import './modal.scss';

//houses the preview for the image
export default function PreviewModal({ modalOpen, setModalClosed, message, previewID }) {
    //used to generate and show image
    const url = "http://127.0.0.1:5000/image?id="+ previewID.toString();
    // const url = "https://ddsimagegen.herokuapp.com/image?id=" + previewID.toString();
    return (
        <>
            <Modal className="modal_form_content" overlayClassName="modal_form_overlay" isOpen={modalOpen} onRequestClose={setModalClosed} ariaHideApp={false}>
                <div>
                    <h1>Message Preview</h1>
                    <img className = "p_img" src={url}></img><br />
                    <button onClick={setModalClosed} className="btn btn-danger btn-sm">Close</button>
                </div>
            </Modal>
            
        </>
       
    );

   
};

