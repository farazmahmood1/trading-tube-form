import React from 'react'
import { Modal } from 'pretty-modal'
import { toast } from "react-toastify";


const Congratulation = ({ shouldShow }) => {

    const showToaster = () => {
        toast.info('IOS version comming soon!', { theme: "dark" })
    }
    return (
        <div>
            <Modal open={shouldShow}>
                <div className='card-body text-white text-center'>
                    <h2 style={{ color: '#ceb775' }}>Congratulations,</h2>
                    <br className='bg-primary' />
                    <h5>You're successfully registered on trading tube.</h5>
                    <br />
                    <p className='mb-4'>Now please download the Trading Tube mobile application to claim your 500 rupees!</p>

                    <div className="d-flex justify-content-center">
                        <button onClick={showToaster} className='btn btn-outline-warning me-1' > <i class="fa-brands fa-app-store-ios" /> for IOS</button>
                        <a className='btn btn-outline-warning ms-1' target={'_blank'} rel="noreferrer" href='https://play.google.com/store/apps/details?id=com.tradingtube' > <i class="fa-brands fa-google-play" /> for Android</a>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default Congratulation