import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import './Auth.css'


const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || localStorage.getItem("verifyEmail");

    if (!email) {
        navigate('/register');
        return null
    }

    const sendOtp = async () => {
        if (sendingOtp) return;

        setError("");
        setSuccess("");

        try {
            setSendingOtp(true);
            const res = await axiosInstance.post("/auth/send-otp",
                { email }
            );

            setSuccess(res.data.message || "OTP sent to your email");
            setOtpSent(true);
        } catch (error) {
            setError(error.response?.data?.message || "Error");
        } finally {
            setSendingOtp(false);
        }
    };

    const resendOtp = async () => {
       if(sendingOtp) return

        setError("");
        setSuccess("");
        try {
            setSendingOtp(true);
            const res = await axiosInstance.post("/auth/resend-otp", { email });

            setSuccess(res.data.message || "OTP resent to your email");
        } catch (error) {
            setError(error.response?.data?.message || "Error")
        } finally{
            setSendingOtp(false);
        }
    };
    
    const verifyOtp = async (e) => {
        e.preventDefault();

        if(verifyingOtp) return;

        setError("");
        setSuccess("");

        try {
            setVerifyingOtp(true);

            const res = await axiosInstance.post("/auth/verify-otp",
                { email, otp }
            );

            setSuccess(res.data.message || "Email verified successfully");
            localStorage.removeItem("verifyEmail");

            setTimeout(() => {
                navigate("/login");
            }, 800);
        } catch (error) {
            setError(error.response?.data?.message || "Invalid OTP")
        } finally {
            setVerifyingOtp(false);
        }
    };


    return (

        <div className="verify-container">
            <form className="verify-card" onSubmit={verifyOtp}>
                <h2>Email Verification</h2>

                {success && <p className="success-text">{success}</p>}
                {error && <p className="error-text">{error}</p>}

                <p> <b>Email:</b>{email}</p>

                {!otpSent && (
                    <button type="button" onClick={sendOtp} disabled={sendingOtp }>
                        {sendingOtp ? "Sending OTP..." : "Send OTP"}
                    </button>
                )}

                {otpSent && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <button type="submit" disabled={verifyingOtp}>
                            {verifyingOtp ? "Verifying..." : "Verify OTP"}
                        </button>


                        <button
                            type="button"
                            onClick={resendOtp}
                            disabled={sendingOtp}
                            className="resend-btn"
                        >
                            {sendingOtp ? "Resending OTP..." : "Resend OTP"}
                        </button>


                    </>
                )}

            </form>
        </div>
    )
}

export default VerifyEmail
