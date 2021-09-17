import React, {Component} from 'react';
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {login} from "../utils";


class LoginForm extends Component {
    state = {
        login: false
    }
    onFinish = (values) => {
        // step1: set loading to true
        this.setState({login: true});
        // step2: send login request (call login api) to the server
        // step3: deal with login status -> logged in or not
        // step4: set loading false
        console.log('Received values of form: ', values);
        login(values)
            .then(() => {
                // show login sucess
                message.success('Login Successfully');
                this.props.onSuccess();
            })
            .catch(err => {
                message.error(err.message);
            })
            .finally(() => {
                this.setState({loading: false});
            })
    };

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    {/* Input.Password 会加一个小眼睛在password input里面*/}
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={this.state.loading}
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;