import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

toast.configure();
const Welcome = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [code, setCode] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    const sendCode = () => {
        var formdata = new FormData();
        formdata.append("referal_code", code);

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };
        setLoader(true);

        fetch(
            "https://tradingtubeapi.alphanitesofts.com/api/checkcode",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "400") {
                    setLoader(false);
                    setError(result.status);
                    toast.warning(`Refferal ${result.message}`, { theme: "dark" });
                } else {
                    toast.success("Successfully added refferal code", { theme: "dark" });
                    setInterval(() => {
                        navigate("/Register");
                    }, 1000);
                    setLoader(false);
                }
                console.log(result);
            })
            .catch((error) => {
                if (error.status === 400) {
                    setLoader(false);
                    toast.warning(`Refferal ${error.message}`, { theme: "dark" });
                } else {
                    toast.warning("Something went wrong", { theme: "dark" });
                }
            });
    };

    // const urlEle = window.location.pathname('/');
    // console.log(location.pathname)

    // const render = window.location.pathname
    // console.log(render)

    // const rfer = '7DF0PK'
    // const operator = "?"

    const url = `${window.location.href}`;

    const part = url.split("?");
    const path = part[1];

    console.log(path);

    // const pathName = 'https://registration.tradingtube.co/M4GOG5'
    // const variable = substr(pathName,1)

    // console.log(variable)

    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-6" style={{ marginTop: "10em" }}>
                <div className="center text-white text-center ">
                    <h1>Register Now!</h1>
                    <p className="me-3 ms-3">
                        Welcome to trading tube, a platform where you can earn up to 50k a
                        month easily! Enter the refer code below to register
                    </p>
                    <div className="input-group input-group-lg">
                        <input
                            type="text"
                            className="form-control ms-2 me-2"
                            value={path}
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
                        <span style={{ color: "#CEB775" }}>9000</span>/10000 registers left{" "}
                    </p>

                    {/* <p className='mt-2'>If you dont't have a refferal code try this: <span style={{ color: '#CEB775' }}>M4GOG5</span> </p> */}
                    <button
                        className="btn btn-outline-warning text-white btn-lg mt-2"
                        onClick={sendCode}
                    >
                        Continue{" "}
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
