import React, { useState } from 'react';
import {
    Form,
    Input,
    Button
} from 'antd';
import { Link } from 'react-router-dom';
import httpRequest from '../../../utils/httpRequest';

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
const SignUp = () => {
    let step = 1
    const [form] = Form.useForm();
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        checkPass: '',
    })
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        await httpRequest
            .post('/user/register', {
                email: formState.email,
                password: formState.password,
            })
            .then((res) => {
                step += 1
                localStorage.setItem('tokenRegister', res.data.token)
            })
            .catch(() => alert('Có lỗi xảy ra. Vui lòng thử lại'))
    };
    const validatePassword = () => ({
        validator(_, value) {
            if (value === '') {
                return Promise.reject('Please input the password')
            } else {
                var lowerCaseLetters = /[a-z]/g
                var upperCaseLetters = /[A-Z]/g
                var numbers = /[0-9]/g
                var special = /\W/g
                var whiteSpace = /\s/g
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
    return (
        <div className='flex-col'>
            <h1 className='text-6xl text-blue-600 text-center mb-16'>Sign Up</h1>
            {
                step === 1 && (
                    <Form {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={formState}
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
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" danger htmlType="submit" className='w-full text-xl h-10'>
                                Submit
                            </Button>
                        </Form.Item>
                    </ Form>
                )}
            {step === 2 && (
                <p>
                    Bạn đã yêu cầu đăng ký tài khoản thành công, vui lòng check lại email và xác nhận đăng ký!
                </p>
            )}
            {step === 3 && (
                <p>
                    Bạn xác thực tài khoản thành công. Click vào
                    <Link to="/login"> đây</Link>
                    để đăng nhập vào hệ thống.
                </p>
            )}
            <Link to="/login" className="m-auto float-right hover:text-[#ff4d4f]">Trở lại trang đăng nhập</Link>
        </div>)
};
export default SignUp;
