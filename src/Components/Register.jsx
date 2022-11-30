import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Congratulation from "./Congratulation";
import CountryCode from './CountryCode'
import { useTimer } from 'react-timer-hook';

const Register = ({ Code }) => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cnfrmPassword, setcnfrmPassword] = useState("");
    const [cnic, setCnic] = useState("");
    const [question, setQuestion] = useState("What is your hobby?");
    const [answer, setAnswer] = useState("");
    const [otp, setOtp] = useState("");

    const [countryCode, setCountryCode] = useState('92')
    const [wstatus, setWstatus] = useState(false);
    const [pstatus, setPstatus] = useState(false);
    const [qstatus, setQstatus] = useState(false);

    const [shouldShow, setShouldShow] = useState(false)
    const [val, setVal] = useState('')
    const [index, setIndex] = useState(1);

    const [passwordShown, setPasswordShown] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    function MyTimer({ expiryTimestamp }) {
        const {
            seconds,
            minutes,
            isRunning,
            restart,
        } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

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
                        <p>Did'nt Recieved the OTP</p>
                        <button
                            onClick={() => {
                                reseTimer();
                                sendOtp();
                            }} className='btn btn-outline-danger btn-sm'> 
                            Resend
                        </button>
                    </>
                }
            </div>
        );
    }

    const time = new Date();
    time.setSeconds(time.getSeconds() + 59); // 10 minutes timer

    const submitData = () => {
        const userObj = {
            email: email,
            username: userName,
            cnic: cnic,
            phone: countryCode + phone,
            password: password,
            password_confirmation: cnfrmPassword,
            code: Code,
            firstname: fname,
            lastname: lname,
            question: question,
            answer: answer,
            role_id: "5",
        };

        axios.post("https://apis.tradingtube.net/api/register", userObj)
            .then(res => {
                toast.success("Resgistered Successfully", { theme: "dark" });
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                if (err.response.data.status === "401") {
                    toast.warn(err.response.data.message, { theme: "dark" });
                    console.log(err)
                }
                else {
                    toast.warning(err.response.data.message, { theme: "dark" });
                }
            });
    };




    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }

    const randomNum = () => {
        var randomVal = Math.floor(1000 + Math.random() * 9000);
        setVal(randomVal)
    }

    const onNext = () => {
        if (index === 1) {
            if (fname !== "" && lname !== "" && userName !== "" && email !== "") {
                setIndex(index + 1);
                // function for the random number generator
                randomNum()

            } else {
                toast.warning("Please fill all fields", { theme: "dark" });
                setWstatus(true);
            }
        } else if (index === 2) {
            if (
                phone !== "" &&
                password === cnfrmPassword &&
                cnic !== ""
            ) {
                setIndex(index + 1);
                sendOtp()

                // randomNum()
            }

            else if (password !== cnfrmPassword) {
                toast.warn('Password does not match', { theme: 'dark' })
            }

            else {
                toast.warning("Please fill all fields", { theme: "dark" });
                setPstatus(true);
            }
        } else if (index === 3) {

            if (answer !== "") {
                setIndex(index + 1);
                // sendOtp()

            } else {
                toast.warning("Please fill all fields", { theme: "dark" });
                setQstatus(true);
            }
        }
        else if (index === 4) {
            if (Number(otp) === Number(val)) {
                submitData()
                oncloseModal()
            }
            else if (!otp) {
                toast.warn('Please enter a OTP', { theme: 'dark' })
            }
            else {
                toast.warn("Please enter a valid OTP", { theme: 'dark' })
            }
        }
        else {
            return null;
        }
    };

    const sendOtp = () => {
        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': 'be434c3026msh50dc650f31b5e59p1380e1jsn8889f821e46d',
                'X-RapidAPI-Host': 'telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com'
            }
        };
        fetch(`https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code?phoneNumber=${countryCode + phone}&verifyCode=${val}&appName=tradingtube`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.message === "Invalid phone number") {
                    toast.warn('Cant send OTP, please Enter a valid number', { theme: 'dark' })
                    setIndex(2)
                }
            })
            .catch(err => {
                toast.warn(`${err.message}`, { theme: 'dark' })
                console.log(err)
            });
    }


    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const showConfirmPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-6 text-white" style={{ marginTop: "3em" }}>

                {
                    index === 4 ?
                        <>
                            <div className="text-center" style={{ marginTop: '6em' }}>
                                <h1>Verification</h1>
                                <p className="me-3 ms-3">
                                    Please Enter the OTP that you have received on your phone number ,  if you do not received the OTP, you can try again later.
                                </p>
                                {/* <p>OTP code</p> */}
                            </div>
                        </>
                        :
                        <>
                            <h1 className="text-center">Welcome</h1>
                            <p className="me-3 ms-3 text-center">
                                Please fill the following details to get registered on Trading Tube
                            </p>
                        </>
                }

                <div className="">
                    <div className="col-lg-12 mx-auto">
                        <div
                            className="card bg-dark p-3 m-2"
                            style={{ borderRadius: "10px" }}
                        >
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
                                                type="number"
                                                className="form-control" defaultValue={cnic}
                                                onChange={(e) => setCnic(e.target.value)}
                                                placeholder="Type your CNIC without dashes"
                                                style={{
                                                    backgroundColor: "#171717",
                                                    color: "#F6F6F6",
                                                    borderRadius: "10PX",
                                                    borderColor:
                                                        pstatus === true && cnic === "" ? "red" : "#CEB775",
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

                            {index === 3 ? (
                                <>
                                    <div className="card-body">
                                        <div className="form-label">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Questions
                                            </label>
                                            <select
                                                className="form-select" defaultValue={answer}
                                                onChange={(e) => setQuestion(e.target.value)}
                                                aria-label="Default select example"
                                                style={{
                                                    backgroundColor: "#171717",
                                                    color: "#F6F6F6",
                                                    borderColor: "#CEB775",
                                                    borderRadius: "10PX",
                                                }}
                                            >
                                                <option value="What is your hobby?">What is your hobby?</option>
                                                <option value="What is your pet name?">What is your pet name?</option>
                                                <option value=" What is your best friend name?">
                                                    What is your best friend name?
                                                </option>
                                                <option value="What is your father name?">What is your father name?</option>
                                                <option value=">What is your school name?">What is your school name?</option>
                                            </select>
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

                                            <MyTimer expiryTimestamp={time} />


                                        </div>
                                    </div>
                                </>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-center">
                    {index === 1 ? (
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
                        onClick={onNext}
                        className="btn btn-outline-warning text-white btn-lg mt-2 ms-2"
                    >
                        Continue <i className="fa-solid fa-chevron-right" />{" "}
                    </button>

                </div>
            </div>
            {< Congratulation shouldShow={shouldShow} />}
        </div>
    );
};

export default Register;