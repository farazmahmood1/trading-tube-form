import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Congratulation from "./Congratulation";
import CountryCode from './CountryCode'
import { useTimer } from 'react-timer-hook';
import { EncryptStorage } from 'encrypt-storage';

import authentication from "../firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Register = ({ Code }) => {


    // Otp verification
    const [code, setCode] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    // modal & indexes
    const [shouldShow, setShouldShow] = useState(false)
    const [index, setIndex] = useState(0);

    // Summit Data
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cnfrmPassword, setcnfrmPassword] = useState("");
    const [cnic, setCnic] = useState("");
    const [question, setQuestion] = useState("Select Questions");
    const [answer, setAnswer] = useState("");
    const [otp, setOtp] = useState("");
    const [countryCode, setCountryCode] = useState('92')

    // error fields
    const [wstatus, setWstatus] = useState(false);
    const [pstatus, setPstatus] = useState(false);
    const [qstatus, setQstatus] = useState(false);
    const [cnicField, setCnicField] = useState(false)

    // show password
    const [passwordShown, setPasswordShown] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    // confirm otp
    const [confirm, setConfirm] = useState(null)



    const [loading, setLoading] = useState(false)

    function getReferal() {
        const url = `${window.location.href}`;
        const part = url.split("?");
        const path = part[1];
        setCode(path)
    }

    useEffect(() => {
        getReferal()
    }, [])

    const sendCode = () => {
        setLoader(true);
        const RefObj = {
            referal_code: code
        }
        axios.post("https://apis.tradingtube.net/api/checkcode", RefObj)
            .then((res) => {
                if (res.data.status === "200") {
                    setLoader(false);
                    toast.info(`Referral ${res.data.message}`, { theme: "dark" });
                    // setInterval(() => {
                    setIndex(index + 1)
                    // }, 1000);
                }
                else if (code === undefined) {
                    toast.warning(`Please enter valid referral code`, { theme: "dark" });
                    setLoader(false);
                }
                else {
                    setError(res.data.status);
                    toast.warning(`Referral code ${res.data.message}`, { theme: "dark" });
                    setLoader(false);
                }

            })
            .catch((error) => {
                if (error.status === "400") {
                    setLoader(false);
                    toast.warning(`Referral code ${error.message}`, { theme: "dark" });
                } else {
                    toast.warning("Something went wrong", { theme: "dark" });
                }
            });
    }

    const onNext = () => {
        if (index === 0) {
            if (!code) {
                toast.warn('Please enter a referral code', { theme: 'dark' })
            }
            else {
                sendCode()
            }
        }
        else if (index === 1) {
            if (fname !== "" && lname !== "" && userName !== "" && email !== "") {
                setIndex(index + 1);
            } else {
                toast.warning("Please fill all fields", { theme: "dark" });
                setWstatus(true);
            }
        }
        else if (index === 2) {
            if (
                phone !== "" &&
                password === cnfrmPassword && cnic !== "" &&
                cnic.length === 13
            ) {
                setIndex(index + 1);
                setCnicField(false)
            }
            else if (password !== cnfrmPassword) {
                toast.warn('Password does not match', { theme: 'dark' })
            }
            else if (cnicField.length !== 13) {
                if (cnic.length < 13 || cnic.length > 13) {
                    toast.warn('Please Enter a valid CNIC', { theme: 'dark' })
                    setCnicField(true)
                    setPstatus(true);

                }
                else if (cnic.length === 13) {
                    setCnicField(false)
                }
            }
            else {
                toast.warning("Please fill all fields", { theme: "dark" });
                setPstatus(true);
            }
        }
        else if (index === 3) {
            if (answer !== "") {
                if (question === "Select Questions") {
                    toast.warn('Please Select any question', { theme: 'dark' })
                }
                else {

                    checkRegisters()
                }

            } else {
                toast.warning("Please fill all fields", { theme: "dark" });
                setQstatus(true);
            }
        }
        else if (index === 4) {
            if (!otp) {
                toast.warn('Please enter a OTP', { theme: 'dark' })
            }
            else {
                confirmCode()

            }
        }
        else {
            return null;
        }
    };


    const geneRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                },
            },
            authentication().settings.isAppVerificationDisabledForTesting = true
            // 
        );
    };

    const requestOTP = () => {
        geneRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, `+${countryCode}${phone}`, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setConfirm(confirmationResult)
                console.log(window.confirmationResult)
            })
            .catch((error) => {
                toast.warn("Session Expired! please re-click on the Refer code URL sent by your friend!", { theme: "dark" })
                console.log(error);
            });
    };

    async function confirmCode() {
        setLoading(true)
        setLoader(true)
        try {
            await confirm.confirm(otp);
            submitData()
        } catch (error) {
            setLoading(false)
            setLoader(false)

            toast.warn("OTP, DOES NOT MATCH OR EXPIRED!", { theme: "dark" })
        }
    }

    function MyTimer({ expiryTimestamp }) {
        const {
            seconds,
            minutes,
            isRunning,
            restart,
        } = useTimer({ expiryTimestamp, onExpire: () => { return null } });

        const reseTimer = () => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 59);
            restart(time)
        }
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '100px' }}>
                    <span>{minutes}</span>:<span>{seconds}</span>
                </div>
                {isRunning ? <p>We are sending OTP to the provided number</p> :
                    <>
                        <p>Didn't Recieved the OTP</p>
                        <button
                            onClick={() => {
                                reseTimer();
                                requestOTP()
                            }} className='btn btn-outline-danger btn-sm'>
                            Resend
                        </button>
                    </>
                }
            </div>
        );
    }

    const time = new Date();
    time.setSeconds(time.getSeconds() + 59);

    const checkRegisters = () => {
        setLoader(true)

        const userObj = {
            email: email,
            username: userName,
            cnic: cnic,
            phone: countryCode + phone,
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}check_register`, userObj)
            .then(res => {
                if (res.data.status === "200") {
                    setLoader(false)

                    setIndex(index + 1);
                    requestOTP()
                }
            })
            .catch(err => {
                setLoader(false)
                console.log(err)
                if (err.response.status === "401") {
                    toast.warn(err.response.data.message, { theme: "dark" });
                }
                else {
                    toast.warn(err.response.data.message, { theme: "dark" });
                }
            });
    }

    // const submitData = () => {
    //     const userObj = {
    //         email: email,
    //         username: userName,
    //         cnic: cnic,
    //         phone: countryCode + phone,
    //         password: password,
    //         password_confirmation: cnfrmPassword,
    //         code: Code,
    //         firstname: fname,
    //         lastname: lname,
    //         question: question,
    //         answer: answer,
    //         role_id: "5",
    //     };

    //     axios.post("https://apis.tradingtube.net/api/register", userObj)
    //         .then(res => {
    //             toast.success("Resgistered Successfully", { theme: "dark" });
    //             oncloseModal()
    //         })
    //         .catch(err => {
    //             if (err.response.data.status === "401") {
    //                 toast.warn(err.response.data.message, { theme: "dark" });
    //             }
    //             else {
    //                 toast.warning(err.response.data.message, { theme: "dark" });
    //             }
    //         });
    // };

    const submitData = () => {
        setLoader(true)

        const userObj = {
            email: email,
            username: userName,
            cnic: cnic,
            phone: countryCode + phone,
            password: password,
            password_confirmation: cnfrmPassword,
            code: Code === undefined ? "PHRNEL" : Code,
            firstname: fname,
            lastname: lname,
            question: question,
            answer: answer,
            role_id: "5",
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}register`, userObj)
            .then(res => {
                const encryptStorage = new EncryptStorage('secret-key', {
                    prefix: '@instance1',
                });
                const encryptStorageTwo = new EncryptStorage('secret-key', {
                    prefix: '@instance2'
                });

                encryptStorage.setItem('unique_key', res.data.token);
                encryptStorageTwo.setItem('userID', (res.data.user.username));

                toast.success("Resgistered Successfully", { theme: "dark" });
                setLoader(false)

                oncloseModal()
            })
            .catch(err => {
                setLoader(false)
                if (err.response.data.status === "401") {
                    toast.warn(err.response.data.message, { theme: "dark" });
                }
                else {
                    toast.warning(err.response.data.message, { theme: "dark" });
                }
            });
    };

    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }

    // const sendOtp = () => {
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'X-RapidAPI-Key': 'be434c3026msh50dc650f31b5e59p1380e1jsn8889f821e46d',
    //             'X-RapidAPI-Host': 'telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com'
    //         }
    //     };
    //     fetch(`https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code?phoneNumber=${countryCode + phone}&verifyCode=${val}&appName=tradingtube`, options)
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.message === "Invalid phone number") {
    //                 toast.warn('Cant send OTP, please Enter a valid number', { theme: 'dark' })
    //                 setIndex(2)
    //             }
    //         })
    //         .catch(err => {
    //             toast.warn(`${err.message}`, { theme: 'dark' })
    //         });
    // }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const showConfirmPassword = () => {
        setShowPassword(!showPassword)
    }

    const headingChange = () => {
        if (index === 0) {
            return (
                <>
                    <div className="text-center" style={{ marginTop: '6em' }}>
                        <h1 style={{ color: "#CEB775" }}>Register Now!</h1>
                        <p className="me-3 ms-3">
                            Welcome to Trading Tube, a platform where you can earn up to 50k in a
                            month easily! Enter the refer code below to register yourself and get started ...
                        </p>
                    </div>
                </>
            )
        }
        else if (index === 4) {
            return (
                <>
                    <div className="text-center" style={{ marginTop: '6em' }}>
                        <h1>Verification</h1>
                        <p className="me-3 ms-3">
                            Please Enter the OTP that you have received on your phone number ,  if you do not received the OTP, you can try again later.
                        </p>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="text-center" style={{ marginTop: '3em' }}>
                        <h1>Welcome</h1>
                        <p className="me-3 ms-3 text-center">
                            Please fill the following details to get registered on Trading Tube
                        </p>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-6 text-white" style={{ marginTop: "3em" }}>

                {
                    headingChange()
                }


                <div className="col-lg-12 mx-auto">
                    <div className="card bg-dark p-3 m-2" style={{ borderRadius: "10px" }}>

                        {index === 0 ? (
                            <>
                                <div className="center text-white text-center ">
                                    <div className="input-group input-group-lg">
                                        <input
                                            type="text"
                                            className="form-control ms-2 me-2"
                                            defaultValue={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderColor: "#CEB775",
                                                borderRadius: "10PX",
                                            }}
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-lg"
                                        />
                                    </div>
                                    {!error ? (
                                        ""
                                    ) : (
                                        <p className="text-danger mt-1">
                                            You added a wrong refferal code, Please verify the provided
                                            refferal code
                                        </p>
                                    )}

                                    <p className="mt-3">
                                        Promotion offer is only for first 10,000 users, Hurry up only{" "}
                                        <span style={{ color: "#CEB775" }}>9000</span>/10000 registers left.{" "}
                                    </p>
                                </div>
                            </>
                        ) : (
                            null
                        )}

                        {index === 1 ? (
                            <>
                                <div className="card-body">
                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setFname(e.target.value)}
                                            placeholder="Enter your first name" defaultValue={fname}
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderRadius: "10PX",
                                                borderColor:
                                                    wstatus === true && fname === ""
                                                        ? "red"
                                                        : "#CEB775",
                                            }}
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-lg"
                                        />
                                    </div>
                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setLname(e.target.value)}
                                            placeholder="Enter your last name" defaultValue={lname}
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderRadius: "10PX",
                                                borderColor:
                                                    wstatus === true && lname === ""
                                                        ? "red"
                                                        : "#CEB775",
                                            }}
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-lg"
                                        />
                                    </div>
                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="Enter your username" defaultValue={userName}
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderRadius: "10PX",
                                                borderColor:
                                                    wstatus === true && userName === ""
                                                        ? "red"
                                                        : "#CEB775",
                                            }}
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-lg"
                                        />
                                    </div>
                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email" defaultValue={email}
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderRadius: "10PX",
                                                borderColor:
                                                    wstatus === true && email === ""
                                                        ? "red"
                                                        : "#CEB775",
                                            }}
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-lg"
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            null
                        )}

                        {index === 2 ? (
                            <>
                                <div className="card-body">
                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Phone Number
                                        </label>

                                        <div className="input-group">
                                            <select className="form-select" id="inputGroupSelect04" onChange={(e) => setCountryCode(e.target.value)} style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderRadius: "10PX",
                                                borderColor:
                                                    "#CEB775",
                                            }} aria-label="Example select with button addon">

                                                {
                                                    CountryCode.map((items) => {
                                                        return (
                                                            <>
                                                                <option>{items.code}</option>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </select>
                                            <input type="number" className="form-control w-50" placeholder=" XXX XXXXXXX"
                                                onChange={(e) => setPhone(e.target.value)} defaultValue={phone}
                                                style={{
                                                    backgroundColor: "#171717",
                                                    color: "#F6F6F6",
                                                    borderRadius: "10PX",
                                                    borderColor:
                                                        pstatus === true && phone === ""
                                                            ? "red"
                                                            : "#CEB775",
                                                }} aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>

                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Password
                                        </label>
                                        <div className="form-input">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                placeholder="Enter your password" defaultValue={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={{
                                                    backgroundColor: "#171717",
                                                    color: "#F6F6F6",
                                                    borderRadius: "10PX",
                                                    borderColor:
                                                        pstatus === true && password === ""
                                                            ? "red"
                                                            : "#CEB775",
                                                }}
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-lg"
                                            />
                                            <span className="icon me-2">{showPassword === false ? <i className="fa-solid fa-eye" onClick={showConfirmPassword} /> : <i className="fa-solid fa-eye-slash" onClick={showConfirmPassword} />} </span>
                                        </div>
                                    </div>

                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Confirm Password
                                        </label>

                                        <div className="form-input">
                                            <input
                                                type={passwordShown ? "text" : "password"}
                                                className="form-control" defaultValue={cnfrmPassword}
                                                onChange={(e) => setcnfrmPassword(e.target.value)}
                                                placeholder="Re-type your password"
                                                style={{
                                                    backgroundColor: "#171717",
                                                    color: "#F6F6F6",
                                                    borderRadius: "10PX",
                                                    borderColor:
                                                        pstatus === true && cnfrmPassword === ""
                                                            ? "red"
                                                            : "#CEB775",
                                                }}
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-lg"
                                            />
                                            <span className="icon me-2">{passwordShown === false ? <i className="fa-solid fa-eye" onClick={togglePassword} /> : <i className="fa-solid fa-eye-slash" onClick={togglePassword} />} </span>
                                        </div>

                                    </div>
                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            CNIC
                                        </label>
                                        <input

                                            maxLength="13"
                                            type="number"
                                            className="form-control" defaultValue={cnic}
                                            onChange={(e) => setCnic(e.target.value)}
                                            placeholder="Type your CNIC without dashes"
                                            required
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderRadius: "10PX",
                                                borderColor:
                                                    pstatus === true && cnic === "" ? "red" : "#CEB775"
                                            }}
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-lg"
                                        />
                                        {/* {fielderrorstatus()} */}
                                        {cnicField === true ? <p className="form-text text-danger">Your CNIC should only be 13 digits</p> : null}

                                    </div>
                                </div>
                            </>
                        ) : (
                            null
                        )}

                        {index === 3 ? (
                            <>
                                <div className="card-body">
                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Questions
                                        </label>
                                        <select
                                            className="form-select" defaultValue={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            aria-label="Default select example"
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderColor: "#CEB775",
                                                borderRadius: "10PX",
                                            }}
                                        >

                                            <option>Select Questions</option>
                                            <option >What is your hobby?</option>
                                            <option >What is your best friend name?</option>
                                            <option >What is your father name?</option>
                                            <option >What is your school name?</option>

                                        </select>
                                        <p className="form-text" style={{ fontSize: "12px" }}>These Questions will help you in case you forgot your password</p>
                                    </div>
                                    <div className="form-label">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Answer
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control" defaultValue={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            placeholder="Answer of the question ..."
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderRadius: "10PX",
                                                borderColor:
                                                    qstatus === true && answer === ""
                                                        ? "red"
                                                        : "#CEB775",
                                            }}
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-lg"
                                        />

                                    </div>
                                </div>
                            </>
                        ) : (
                            null
                        )}

                        {index === 4 ? (
                            <>
                                <div className=" text-white text-center">
                                    <div className="form-label">
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Enter the OTP sent to your Phone"
                                            style={{
                                                backgroundColor: "#171717",
                                                color: "#F6F6F6",
                                                borderRadius: "10PX",
                                                borderColor:
                                                    "#CEB775",
                                            }}
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-lg"
                                        />
                                        {
                                            loading === true ?
                                                <>
                                                    <div className="mt-5 mb-5">
                                                        <div className="spinner-border" role="status" style={{ width: '3em', height: '3em' }}>
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>

                                                </> :
                                                <MyTimer expiryTimestamp={time} />
                                        }

                                    </div>
                                </div>
                            </>
                        ) : (
                            null
                        )}
                    </div>
                </div>


                <div className="d-flex justify-content-center">
                    {index === 0 || index === 1 ? (
                        null
                    ) : (
                        <button
                            onClick={() => setIndex(index - 1)}
                            className="btn btn-outline-warning text-white btn-lg mt-2 me-2"
                        >
                            <i className="fa-solid fa-chevron-left" />
                        </button>
                    )}

                    <button
                        className="btn btn-outline-warning text-white btn-lg mt-2"
                        onClick={onNext}
                    >

                        Continue{" "} {" "}
                        {loader === true ? (
                            <i className="fa-solid fa-spinner fa-spin-pulse" />
                        ) : (
                            <i className="fa-solid fa-chevron-right" />
                        )}{" "}
                    </button>

                    <div id="recaptcha-container"></div>
                </div>
            </div>
            {< Congratulation shouldShow={shouldShow} />}
        </div>
    );
};

export default Register;