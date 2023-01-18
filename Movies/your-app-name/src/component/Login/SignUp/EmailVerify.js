import { useEffect } from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../../utils/httpRequest";

function EmailVerify() {
    let step = 1
    let verify = 0
    useEffect(() => { verifyEmail() }, [])
    // chay api xac thuc email
    const verifyEmail = async () => {
        await httpRequest
            .get('/user/register/confirm?token=' + localStorage.getItem('tokenRegister'))
            .then((res) => {
                console.log(res)
                if (res.data) {
                    console.log(res)
                    return (verify == res.data.data.verifyEmail)
                } else {
                    return (verify == 3)
                }
            })
            .catch(() => alert('Có lỗi xảy ra. Vui lòng thử lại'))
        console.log(verify)
        if (verify === 1) {
            step++
        }
        if (verify === 0) {
            alert('Xác thực thất bại!')
        }
        if (verify === 3) {
            step = 3
        }
    }
    return (
        <>
            {step === 1 && (
                <p>Tài khoản đang xác thực, vui lòng chờ trong giây lát</p>
            )}
            {step === 2 && (
                <p>
                    Bạn xác thực tài khoản thành công. Click vào
                    <Link to="/login"> đây</Link>
                    để đăng nhập vào hệ thống.
                </p>
            )}
            {step === 3 && (
                <div>
                    Xác thực tài khoản thất bại
                    <p class="text-red-600">*Lý do: Tài khoản này đã được xác thực.</p>
                    <Link to="/login" class="float-right mt-12 underline"
                    ><i>Trở lại màn hình đăng nhập.</i></Link>
                </div>
            )}
        </>
    );
}

export default EmailVerify;