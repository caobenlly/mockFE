import React from 'react'
import LoginPage from '../Login/Login'
import FG from '../Login/ForgotPass'
import SignUp from '../Login/SignUp'
const LayoutLogin = ({ page }) => {
    return (
        <div>
            <div className="bg-black w-full h-screen flex justify-center items-center">
                <div className="w-5/6 h-5/6 bg-white rounded-2xl flex">
                    <div className="w-2/4 flex items-center justify-center border-r-2 border-gray-200 my-5">
                        <img
                            src="https://assets.topdev.vn/images/2021/05/19/6764a7070cdc6a69bd1f6b4f588871a7-SqYcD.png"
                            alt=""
                            className="w-[500px] h-[150px]"
                        />
                    </div>
                    {/* The slot element is replaced with children in React */}
                    {
                       page == 1 ? (< LoginPage />): page == 2 ? (< SignUp />) : (< FG />)
                    }
                </div>
            </div>
        </div>
    )
}

export default LayoutLogin