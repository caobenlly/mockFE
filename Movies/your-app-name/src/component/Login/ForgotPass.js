import React, { Children, useState } from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import axios from 'axios'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

const FG = () => {
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
                <h1 class="text-6xl mb-14 text-blue-600 text-center">Forgot Password</h1>
                <div class="pr-14">
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

export default FG
