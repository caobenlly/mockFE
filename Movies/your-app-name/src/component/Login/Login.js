import React, { Children, useState } from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import axios from 'axios'
import LayoutLogin from '../Layout/Layout'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

const LoginPage = () => {
    const [form] = Form.useForm()
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        remember: true,
    })

    const onFinish = async (values) => {
        try {
            const res = await axios.post('/user/login', values)
            localStorage.setItem('tokenLogin', res.data.token)
        } catch (err) {
            alert(err)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div class="w-2/4 h-full flex items-center justify-center">
            <div class="">
                <h1 class="text-6xl text-blue-900 text-center">Todo Application</h1>
                <h1 class="text-6xl mb-14 text-blue-600 text-center">Login</h1>
                <div class="">
                    <div className='flex justify-end p-5'>
                        <a className="ml-5 " href="/signup">
                            SignUp
                        </a>
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

                        <div>

                            <Form.Item name="remember" valuePropName="checked" {...tailLayout}>
                                <Checkbox checked={formState.remember} onChange={(e) => setFormState({ ...formState, remember: e.target.checked })}>
                                    Remember me
                                </Checkbox>
                                <a className="ml-5" href="/forgot-password">
                                    Forgot password?
                                </a>

                            </Form.Item>

                        </div>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" className="w-32 bg-blue-500">
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
