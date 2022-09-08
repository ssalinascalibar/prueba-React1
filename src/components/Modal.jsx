import React from 'react'

const Modal = ({hechizo_iso, uso}) => {
  return (
    <div>
        
        <div className="divModal" data-bs-toggle="modal" data-bs-target={'#' + hechizo_iso}>
        {hechizo_iso}
        </div>

        {/* Modal */}
        <div className="modal fade" id={hechizo_iso} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content openedModal">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{hechizo_iso}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                "{uso}"
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Modal