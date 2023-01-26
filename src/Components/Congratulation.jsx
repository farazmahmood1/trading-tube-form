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
                    <h5>You're successfully registered on XYZ tube.</h5>
                    
                    
                </div>
            </Modal>

        </div>
    )
}

export default Congratulation