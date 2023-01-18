import React from 'react'
import LoginPage from '../Login/Login'
import FG from '../Login/ForgotPass'
import SignUp from '../Login/SignUp/SignUp'
import EmailVerify from '../Login/SignUp/EmailVerify'
const LayoutLogin = ({ page }) => {
    return (
        <div>
            <div className="bg-black w-full h-screen flex justify-center items-center">
                <div className="w-full h-5/6 rounded-2xl flex justify-center items-center bg-contain"
                    style={{
                        backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-film-scene-film-background-image_190374.jpg")`,
                    }}>

                    {/* The slot element is replaced with children in React */}
                    {
                        page === 1 ? (< LoginPage />) : page === 2 ? (< SignUp />) : page === 3 ? (< FG />) : (< EmailVerify />)
                    }
                </div>
            </div>
        </div>
    )
}

export default LayoutLogin