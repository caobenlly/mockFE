import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Statistic,
    notification,
} from 'antd';
import httpRequest from '../../utils/httpRequest';
import { Link } from 'react-router-dom';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const { Countdown } = Statistic;

const ForgotPass = () => {
    let step = 1
    let disabled = false
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'LỖI XÁC THỰC OTP',
            description:
                `Xác thực OTP thất bại! Bạn còn ${formState.count} lần nhập OTP. OTP sẽ hết hạn sau 1 phút 30 giây`,
        });
    };
    let deadline = Date.now() + 1000 * 60 * 1.5
    const [form] = Form.useForm();
    const [formState, setFormState] = useState({
        email: '',
        code: '',
        password: '',
        checkPass: '',
        count: 5,
        tokenOtp: '',
        submitBtnName: 'GỬI MÃ OTP',
    })
    const nextStep = () => {
        step += 1
    }
    // ten cua button submit form
    const submitBtnName = () => {
        switch (step) {
            case 2:
                setFormState((formState) => ({ ...formState, submitBtnName: 'XÁC NHẬN OTP' }))
                break
            case 3:
                setFormState((formState) => ({ ...formState, submitBtnName: 'XÁC NHẬN OTP' }))
                break
            case 4:
                setFormState((formState) => ({ ...formState, submitBtnName: 'ĐỔI MẬT KHẨU' }))
                break
            default:
                break
        }
    }
    // lay ma OTP
    const sendOtpStep1 = async () => {
        setLoading(true)
        await httpRequest.get('/user/password/forgot?email=' + formState.email).then((res) => {
            console.log(res)
            localStorage.setItem('tokenOtp', res.data)
        })
            .catch(() => alert('Có lỗi xảy ra. Vui lòng thử lại'))
    }
    // gui OTP xac minh
    const sendOtpStep2 = async () => {
        formState.tokenOtp = localStorage.getItem('tokenOtp')
        await httpRequest
            .get(
                '/v1/users/authentificationotp?email=' + formState.email + '&otp=' + formState.code
            )
            .then((res) => {
                console.log(res)
                if (res.data) {
                    nextStep()
                } else {
                    formState.count-- && openNotificationWithIcon('warning')
                }
            })
    }
    // gui mat khau thay doi
    const sendOtpStep3 = async () => {
        formState.tokenOtp = localStorage.getItem('tokenOtp')
        await httpRequest
            .get(
                '/v1/users/resetPassword?token=' + formState.tokenOtp +
                '&email=' + formState.email + '&newPassword=' + formState.pass
            )
            .then((res) => {
                console.log(res)
            })
            .catch(() => alert('Có lỗi xảy ra. Vui lòng thử lại'))
        nextStep()
    }
    // lay lai OTP
    const resendOtp = () => {
        console.log('gui lai otp')
        sendOtpStep1()
        disabled = false
        deadline = Date.now() + 1000 * 60 * 1.5
    }

    const countDown = () => {
        console.log('deadline')
        disabled = true
    }

    const validatePassword = () => ({
        validator(_, value) {
            if (value === '') {
                return Promise.reject('Please input the password')
            } else {
                const lowerCaseLetters = /[a-z]/g
                const upperCaseLetters = /[A-Z]/g
                const numbers = /\d/g
                const special = /\W/g
                const whiteSpace = /\s/g
                if (value.length < 8) {
                    return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự')
                }
                if (!value.match(lowerCaseLetters)) {
                    return Promise.reject('Mật khẩu phải bao gồm chữ cái viết thường')
                }
                if (!value.match(upperCaseLetters)) {
                    return Promise.reject('Mật khẩu phải bao gồm chữ cái viết hoa')
                }
                if (!value.match(numbers)) {
                    return Promise.reject('Mật khẩu phải bao gồm chữ số')
                }
                if (!value.match(special)) {
                    return Promise.reject('Mật khẩu phải bao gồm kí tự đặc biệt')
                }
                if (value.match(whiteSpace)) {
                    return Promise.reject('Mật khẩu không được có dấu cách')
                }
                return Promise.resolve()
            }
        },
    })
    const onFinish = (values) => {
        console.log(step)
        switch (step) {
            case 1:
                sendOtpStep1()
                deadline = Date.now() + 1000 * 60 * 1.5
                break
            case 2:
                if (formState.count === 0) {
                    alert('Đã hết số lần nhập')
                    formState.count = 0
                } else {
                    sendOtpStep2()
                }
                break
            case 3:
                sendOtpStep3()
                break
            default:
                break
        }
        console.log('Success:', values)
        console.log('OTP', formState.code)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <div className='flex-col'>
            <h1 className='text-6xl text-blue-600 text-center mb-16'>Forgot Password</h1>
            {
                step === 4 ? (
                    <p>
                        Bạn đã thay đổi mật khẩu thành công. Click vào
                        <Link to="/login"> đây </Link>
                        để đăng nhập vào hệ thống.
                    </p>
                ) : (
                    <Form {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
                        </Form.Item>

                        {step === 2 && (
                            <>
                                <Form.Item
                                    name="code"
                                    label="OTP"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập OTP!',
                                        },
                                    ]}
                                >
                                    <Input.Group compact style={{ display: 'flex' }}>
                                        <Input.Password
                                            value={formState.code}
                                            onChange={(e) => setFormState({ ...formState, code: e.target.value })}
                                        />
                                        <Button className='bg-blue-800' htmlType='button' type="primary" onClick={resendOtp}
                                        disabled = {!disabled}
                                        >Gửi lại</Button>
                                    </Input.Group>
                                </Form.Item>
                                <Countdown title="Countdown" value={deadline} onFinish={countDown} />
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        validatePassword()
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password
                                        value={formState.password}
                                        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        value={formState.checkPass}
                                        onChange={(e) => setFormState({ ...formState, checkPass: e.target.value })}
                                    />
                                </Form.Item>
                            </>

                        )}
                        <Form.Item {...tailFormItemLayout}>
                            {contextHolder}
                            <Button type="primary" htmlType="submit"
                                onClick={submitBtnName}
                                className='bg-blue-800 mr-8'
                                disabled = {disabled}
                                loading = {loading}
                            >
                                {formState.submitBtnName}
                            </Button>
                        </Form.Item>
                    </ Form>
                )};
        </div>)
};
export default ForgotPass;
