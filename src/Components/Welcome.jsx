import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


toast.configure();
const Welcome = () => {
    const navigate = useNavigate();

    const [code, setCode] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    const sendCode = () => {
        // console.log(code)

        if (!code) {
            toast.warn('Please enter a referral code', { theme: 'dark' })
        }
        else {
            setLoader(true);
            const RefObj = {
                referal_code: code
            }
            axios.post("https://apis.tradingtube.net/api/checkcode", RefObj)
                .then((res) => {
                    if (res.data.status === "200") {
                        setLoader(false);
                        // console.log(RefObj);
                        toast.info(`Referral code ${res.data.message}`, { theme: "dark" });
                        setInterval(() => {
                            navigate("/Register");
                        }, 1000);
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

                    // console.log(res.data)
                })
                .catch((error) => {
                    if (error.status === "400") {
                        setLoader(false);
                        toast.warning(`Referral code ${error.message}`, { theme: "dark" });
                    } else {
                        // console.log(error)
                        toast.warning("Something went wrong", { theme: "dark" });
                    }
                });
        };
    }


    function getReferal() {
        const url = `${window.location.href}`;
        const part = url.split("?");
        const path = part[1];
        setCode(path)
    }

    useEffect(() => {
        getReferal()
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-6" style={{ marginTop: "10em" }}>
                <div className="center text-white text-center ">
                    <h1 style={{ color: "#CEB775" }}>Register Now!</h1>
                    <p className="me-3 ms-3">
                        Welcome to Trading Tube, a platform where you can earn up to 50k in a
                        month easily! Enter the refer code below to register yourself and get started ...
                    </p>
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

                    <button
                        className="btn btn-outline-warning text-white btn-lg mt-2"
                        onClick={sendCode}
                    >
                        Continue{" "} {" "}
                        {loader === true ? (
                            <i className="fa-solid fa-spinner fa-spin-pulse" />
                        ) : (
                            <i className="fa-solid fa-chevron-right" />
                        )}{" "}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
