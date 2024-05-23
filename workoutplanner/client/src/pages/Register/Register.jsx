import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [info, setInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            if (file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload");

                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/degzje3ts/image/upload",
                    data
                );

                const { url } = uploadRes.data;

                const newUser = {
                    ...info,
                    profilePicture: url,
                };

                await axios.post("/auth/register", newUser);

                navigate("/login");
            } else {
                await axios.post("/auth/register", info);

                navigate("/login");
            }
        } catch (err) {
            console.error("Registration error:", err);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="register">
            <Navbar />
            <div className="registerCard">
                <div className="center">
                    <h1>Join Us</h1>
                    <form>
                        <div className="image">
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                                height="100px"
                            />
                            <div className="txt_field_img">
                                <label htmlFor="file">Image</label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                        <div className="formInput">
                            <div className="txt_field">
                                <input
                                    type="text"
                                    placeholder="username"
                                    name="username"
                                    onChange={handleChange}
                                    id="username"
                                    required
                                />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    onChange={handleChange}
                                    id="email"
                                    required
                                />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    onChange={handleChange}
                                    id="password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="login_button">
                            <button className="button" onClick={handleClick}>
                                Register
                            </button>
                        </div>
                        <div className="signup_link">
                            <p>
                                Already Registered? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
