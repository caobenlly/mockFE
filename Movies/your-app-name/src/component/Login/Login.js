import React, { useState } from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import httpRequest from '../../utils/httpRequest'
import { Link, useNavigate } from 'react-router-dom'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

const LoginPage = () => {
    let navigate = useNavigate()

    const [form] = Form.useForm()
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        remember: true,
    })

    const onFinish = async (values) => {
        console.log(values)
        try {
            const res = await httpRequest.post('/user/login', values)
            navigate('/')
            if (formState.remember) {
                localStorage.setItem('userToken', res.data.token)
            }
        } catch {
            alert('Có lỗi xảy ra. Vui lòng thử lại')
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className="w-2/4 h-full flex items-center justify-center">
            <div>
                <h1 className="text-6xl text-blue-900 text-center">Todo Application</h1>
                <h1 className="text-6xl mb-8 text-blue-600 text-center">Login</h1>
                <div>
                    <div className='flex justify-end p-5'>
                        <Link className="ml-5 hover:text-[#ff4d4f]" to="/signup">
                            SignUp
                        </Link>
                    </div>
                    <Form
                        {...layout}
                        form={form}
                        name="basic"
                        initialValues={formState}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Email is not correct!' }]}
                        >
                            <Input value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                value={formState.password}
                                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" {...tailLayout}>
                            <Checkbox checked={formState.remember} onChange={(e) => setFormState({ ...formState, remember: e.target.checked })}>
                                Remember me
                            </Checkbox>
                            <Link className="ml-5 hover:text-[#ff4d4f]" to="/forgot-password">
                                Forgot password?
                            </Link>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" danger htmlType="submit" className="w-full text-xl h-10">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
