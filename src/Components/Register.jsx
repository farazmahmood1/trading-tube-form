import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Congratulation from "./Congratulation";

const Register = () => {

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

    // const [status, setStatus] = useState("Welcome");
    const [val, setVal] = useState('')
    const [index, setIndex] = useState(1);

    const submitData = () => {
        const userObj = {
            email: email,
            username: userName,
            cnic: cnic,
            phone: phone,
            password: password,
            password_confirmation: cnfrmPassword,
            code: otp,
            firstname: fname,
            lastname: lname,
            question: question,
            answer: answer,
            role_id: "5",
        };

        axios.post("https://apis.tradingtube.net/api/register", userObj)
            .then(res => {
                toast.success("Resgistered Successfully", { theme: "dark" });

            })
            .catch(err => {
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

    const randomNum = () => {
        var randomVal = Math.floor(1000 + Math.random() * 9000);
        // console.log(randomVal);
        setVal(randomVal)
    }

    const onNext = () => {
        if (index === 1) {
            if (fname !== "" && lname !== "" && userName !== "" && email !== "") {
                setIndex(index + 1);
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
                // function for the random number generator
                randomNum()

            }
            else if (password !== cnfrmPassword) {
                toast.warn('Password doesnot match', { theme: 'dark' })
            }
            else {
                toast.warning("Please fill all fields", { theme: "dark" });
                setPstatus(true);
            }
        } else if (index === 3) {

            if (answer !== "") {
                setIndex(index + 1);
                sendOtp()

            } else {
                toast.warning("Please fill all fields");
                setQstatus(true);
            }
        }
        else if (index === 4) {
            //    toast.warn("you are in index 4")
            if (Number(otp) === Number(val)) {
                submitData()
                oncloseModal()
            }
            else {
                toast.warn("Error while adding OTP")
            }
        }
        else {
            console.log('');
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
                if (response.message === "Invalid phone number") {
                    toast.warn('Cant send OTP, please Enter a valid number')
                    setIndex(2)
                    // setErrorCode("phone")
                    // setErrorMessage("Cannot send otp on this phone no please check no again.")
                }
                console.log(response)
            })
            .catch(err => console.error(err));
    }


    // const RenderView = () => {
    //     if (status === "Welcome") {
    //         return (
    //             <>
    //                 <div className="col-md-6 text-white" style={{ marginTop: "3em" }}>
    //                     <h1 className="text-center">Welcome</h1>
    //                     <p className="me-3 ms-3 text-center">
    //                         Register to continue Lorem ipsum dolor sit, amet consectetur
    //                         adipisicing elit. Ullam beatae at possimus totam laborum dolorum.
    //                     </p>
    //                     <div className="">
    //                         <div className="col-lg-12 mx-auto">
    //                             <div
    //                                 className="card bg-dark p-3 m-2"
    //                                 style={{ borderRadius: "10px" }}
    //                             >
    //                                 <div className="card-body">
    //                                     <div className="form-label">
    //                                         <label for="exampleInputEmail1" class="form-label">
    //                                             First Name
    //                                         </label>
    //                                         <input
    //                                             type="text"
    //                                             className="form-control"
    //                                             onChange={(e) => setFname(e.target.value)}
    //                                             placeholder="Enter your first name"
    //                                             style={{
    //                                                 backgroundColor: "#171717",
    //                                                 color: "#F6F6F6",
    //                                                 borderRadius: "10PX",
    //                                                 borderColor:
    //                                                     wstatus === true && fname === ""
    //                                                         ? "red"
    //                                                         : "#CEB775",
    //                                             }}
    //                                             aria-label="Sizing example input"
    //                                             aria-describedby="inputGroup-sizing-lg"
    //                                         />
    //                                     </div>
    //                                     <div className="form-label">
    //                                         <label for="exampleInputEmail1" class="form-label">
    //                                             Last Name
    //                                         </label>
    //                                         <input
    //                                             type="text"
    //                                             className="form-control"
    //                                             onChange={(e) => setLname(e.target.value)}
    //                                             placeholder="Enter your last name"
    //                                             style={{
    //                                                 backgroundColor: "#171717",
    //                                                 color: "#F6F6F6",
    //                                                 borderRadius: "10PX",
    //                                                 borderColor:
    //                                                     wstatus === true && fname === ""
    //                                                         ? "red"
    //                                                         : "#CEB775",
    //                                             }}
    //                                             aria-label="Sizing example input"
    //                                             aria-describedby="inputGroup-sizing-lg"
    //                                         />
    //                                     </div>
    //                                     <div className="form-label">
    //                                         <label for="exampleInputEmail1" class="form-label">
    //                                             User Name
    //                                         </label>
    //                                         <input
    //                                             type="text"
    //                                             className="form-control"
    //                                             onChange={(e) => setUserName(e.target.value)}
    //                                             placeholder="Enter your username"
    //                                             style={{
    //                                                 backgroundColor: "#171717",
    //                                                 color: "#F6F6F6",
    //                                                 borderRadius: "10PX",
    //                                                 borderColor:
    //                                                     wstatus === true && fname === ""
    //                                                         ? "red"
    //                                                         : "#CEB775",
    //                                             }}
    //                                             aria-label="Sizing example input"
    //                                             aria-describedby="inputGroup-sizing-lg"
    //                                         />
    //                                     </div>
    //                                     <div className="form-label">
    //                                         <label for="exampleInputEmail1" class="form-label">
    //                                             Email
    //                                         </label>
    //                                         <input
    //                                             type="email"
    //                                             className="form-control"
    //                                             onChange={(e) => setEmail(e.target.value)}
    //                                             placeholder="Enter your email"
    //                                             style={{
    //                                                 backgroundColor: "#171717",
    //                                                 color: "#F6F6F6",
    //                                                 borderRadius: "10PX",
    //                                                 borderColor:
    //                                                     wstatus === true && fname === ""
    //                                                         ? "red"
    //                                                         : "#CEB775",
    //                                             }}
    //                                             aria-label="Sizing example input"
    //                                             aria-describedby="inputGroup-sizing-lg"
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="d-flex justify-content-center">
    //                         <button
    //                             onClick={() => navigate("/")}
    //                             className="btn btn-outline-warning text-white btn-lg mt-2 me-2"
    //                         >
    //                             <i className="fa-solid fa-chevron-left" />{" "}
    //                         </button>
    //                         <button
    //                             onClick={submitData}
    //                             className="btn btn-outline-warning text-white btn-lg mt-2 ms-2"
    //                         >
    //                             Continue <i className="fa-solid fa-chevron-right" />{" "}
    //                         </button>
    //                     </div>
    //                 </div>
    //             </>
    //         );
    //     } else if (status === "Contact") {
    //         return (
    //             <>
    //                 <div className="col-md-6 text-white" style={{ marginTop: "3em" }}>
    //                     <h1 className="text-center">Welcome</h1>
    //                     <p className="me-3 ms-3 text-center">
    //                         Register to continue Lorem ipsum dolor sit, amet consectetur
    //                         adipisicing elit. Ullam beatae at possimus totam laborum dolorum.
    //                     </p>
    //                     <div className="">
    //                         <div className="col-lg-12 mx-auto">
    //                             <div
    //                                 className="card bg-dark p-3 m-2"
    //                                 style={{ borderRadius: "10px" }}
    //                             ></div>
    //                         </div>
    //                     </div>

    //                     <div className="d-flex justify-content-center">
    //                         <button
    //                             onClick={() => setStatus("Welcome")}
    //                             className="btn btn-outline-warning text-white btn-lg mt-2 me-2"
    //                         >
    //                             <i className="fa-solid fa-chevron-left" />{" "}
    //                         </button>
    //                         <button
    //                             onClick={() => setStatus("Question")}
    //                             className="btn btn-outline-warning text-white btn-lg mt-2 ms-2"
    //                         >
    //                             Continue <i className="fa-solid fa-chevron-right" />{" "}
    //                         </button>
    //                     </div>
    //                 </div>
    //             </>
    //         );
    //     } else if (status === "Question") {
    //         return (
    //             <>
    //                 <div className="col-md-6 text-white" style={{ marginTop: "3em" }}>
    //                     <h1 className="text-center">Welcome</h1>
    //                     <p className="me-3 ms-3 text-center">
    //                         Register to continue Lorem ipsum dolor sit, amet consectetur
    //                         adipisicing elit. Ullam beatae at possimus totam laborum dolorum.
    //                     </p>
    //                     <div className="">
    //                         <div className="col-lg-12 mx-auto">
    //                             <div
    //                                 className="card bg-dark p-3 m-2"
    //                                 style={{ borderRadius: "10px" }}
    //                             ></div>
    //                         </div>
    //                     </div>

    //                     <div className="d-flex justify-content-center">
    //                         <button
    //                             onClick={() => setStatus("Contact")}
    //                             to="/Contact"
    //                             className="btn btn-outline-warning text-white btn-lg mt-2 me-2"
    //                         >
    //                             <i className="fa-solid fa-chevron-left" />{" "}
    //                         </button>
    //                         <button
    //                             onClick={() => setStatus("Otp")}
    //                             className="btn btn-outline-warning text-white btn-lg mt-2 ms-2"
    //                         >
    //                             Continue <i className="fa-solid fa-chevron-right" />{" "}
    //                         </button>
    //                     </div>
    //                 </div>
    //             </>
    //         );
    //     } else if (status === "Otp") {
    //         return (
    //             <>
    //                 <div
    //                     className="col-md-6 text-white text-center"
    //                     style={{ marginTop: "10em" }}
    //                 >
    //                     <h1>Verification</h1>
    //                     <p className="me-3 ms-3">
    //                         Register to continue Lorem ipsum dolor sit, amet consectetur
    //                         adipisicing elit. Ullam beatae at possimus totam laborum dolorum.
    //                     </p>

    //                     <div className="form-label">
    //                         <label for="exampleInputEmail1" class="form-label">
    //                             OTP Code
    //                         </label>
    //                         <input
    //                             type="number"
    //                             className="form-control form-control-lg"
    //                             onChange={(e) => setOtp(e.target.value)}
    //                             placeholder="Enter the OTP sent to your Phone"
    //                             style={{
    //                                 backgroundColor: "#171717",
    //                                 color: "#F6F6F6",
    //                                 borderColor: "#CEB775",
    //                                 borderRadius: "10PX",
    //                             }}
    //                             aria-label="Sizing example input"
    //                             aria-describedby="inputGroup-sizing-lg"
    //                         />
    //                     </div>
    //                     <div className="d-flex justify-content-center">
    //                         <button
    //                             onClick={() => setStatus("Question")}
    //                             to="/Contact"
    //                             className="btn btn-outline-warning text-white btn-lg mt-2 me-2"
    //                         >
    //                             <i className="fa-solid fa-chevron-left mt-2" />{" "}
    //                         </button>
    //                         <button className="btn btn-outline-warning text-white btn-lg mt-2 ms-2">
    //                             Register Now <i className="fa-solid fa-chevron-right" />{" "}
    //                         </button>
    //                     </div>
    //                 </div>
    //             </>
    //         );
    //     } else {
    //         console.log("Something went wrong");
    //     }
    // };


    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-6 text-white" style={{ marginTop: "3em" }}>

                {
                    index === 4 ?
                        <>
                            <div className="text-center" style={{ marginTop: '6em' }}>
                                <h1>Verification</h1>
                                <p className="me-3 ms-3">
                                    Please Enter the OTP sent to the provided number, if you do not receieved the OTP, you can try again later.
                                </p>
                                {/* <p>OTP code</p> */}
                            </div>
                        </>
                        :
                        <>
                            <h1 className="text-center">Welcome</h1>
                            <p className="me-3 ms-3 text-center">
                                Welcome to trading tube, a platform where you can earn up to 50k a month easily!
                                Enter the refer code below to register.
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
                                ''
                            )}

                            {index === 2 ? (
                                <>
                                    <div className="card-body">
                                        <div className="form-label">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Phone Number
                                            </label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" style={{
                                                    backgroundColor: "#171717",
                                                    color: "#F6F6F6",
                                                    borderRadius: "10PX",
                                                    borderColor:
                                                        "#CEB775",
                                                }} id="basic-addon1">+92</span>
                                                <input type="number" className="form-control" placeholder=" XXX XXXXXXX"
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
                                            <input
                                                type="password"
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
                                        </div>
                                        <div className="form-label">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
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
                                ''
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
                                ''
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
                                                        // fieldStatus === true && otp === ""
                                                        //   ? "red":
                                                        "#CEB775",
                                                }}
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-lg"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-center">
                    {index === 1 ? (
                        ''
                    ) : (
                        <button
                            onClick={() => setIndex(index - 1)}
                            className="btn btn-outline-warning text-white btn-lg mt-2 me-2"
                        >
                            <i className="fa-solid fa-chevron-left" />
                        </button>
                    )}


                    {/* {
                        index === 3 ? <button
                            onClick={submitData}
                            className="btn btn-outline-warning text-white btn-lg mt-2 ms-2"
                        >
                            Continue <i className="fa-solid fa-chevron-right" />
                        </button> : ''
                    } */}

                    {/* {
                        index === 3 ? '' :
                        <button
                            onClick={onNext}
                            className="btn btn-outline-warning text-white btn-lg mt-2 ms-2"
                        >
                            Continue <i className="fa-solid fa-chevron-right" />
                        </button>
                    } */}


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