import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

toast.configure()
const Welcome = () => {
    const navigate = useNavigate();

    const [code, setCode] = useState('')
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')

    const sendCode = () => {

        var formdata = new FormData();
        formdata.append("referal_code", code);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        setLoader(true)

        fetch("https://tradingtubeapi.alphanitesofts.com/api/checkcode", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "400") {
                    setLoader(false)
                    setError(result.status)
                    toast.warning(`OTP ${result.message}`, { theme: "dark" })
                }
                else {
                    toast.success('Sucess')
                    setInterval(() => {
                        navigate('/Register')
                    }, 1000);
                    setLoader(false)
                }
                console.log(result)
            })
            .catch(error => {
                if (error.status === 400) {
                    setLoader(false)
                    toast.warning(`OTP${error.message}`, { theme: "dark" })
                }
                else {
                    toast.warning('Something went wrong', { theme: "dark" })
                }
            });
    }


    return (
        <div className='d-flex justify-content-center'>
            <div className='col-md-6' style={{ marginTop: "10em" }}>
                <div className='center text-white text-center '>
                    <h1>Register Yourself</h1>
                    <p className='me-3 ms-3'>Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                    <div className="input-group input-group-lg">
                        <input type="text" className="form-control ms-2 me-2" onChange={(e) => setCode(e.target.value)} placeholder='Enter referal code ...' style={{ backgroundColor: "#171717", color: '#F6F6F6', borderColor: '#CEB775', borderRadius: '10PX' }} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    </div>
                    {!error ? '' : <p className="text-danger">You added a wrong refferal code</p>}
                    <p className='mt-2'>If you dont't have a refferal code try this: <span style={{ color: '#CEB775' }}>M4GOG5</span> </p>
                    {code ? <button className='btn btn-outline-warning text-white btn-lg mt-2' onClick={sendCode}>Continue {loader === true ? <i className='fa-solid fa-spinner fa-spin-pulse' /> : <i className='fa-solid fa-chevron-right' />} </button> : ''}

                </div>
            </div>
        </div>
    )
}

export default Welcome