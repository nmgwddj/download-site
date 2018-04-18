import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { withRouter } from 'react-router-dom'
import { compose, withHandlers } from 'recompose'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'

const FormItem = Form.Item

const Login = ({ form, handleSubmit }) => {
  const { getFieldDecorator } = form

  return (
    <Form onSubmit={(e) => handleSubmit(e)} style={styles.form}>
      <img src='/images/login_logo.png' style={styles.logo} />
      <FormItem>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入您的用户名！' }]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='用户名'
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入您的密码！' }]
        })(
          <Input
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
            placeholder='密码'
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>记住我</Checkbox>
        )}
        <a style={styles.forget} href=''>忘记密码</a>
        <Button type='primary' htmlType='submit' style={styles.login}>
          登录
        </Button>
        或 <a href=''>现在注册</a>
      </FormItem>
    </Form>
  )
}

export default compose(
  Form.create(),
  withRouter,
  withHandlers({
    handleSubmit: ({ history, form }) => (e) => {
      e.preventDefault()
      form.validateFields((err, values) => {
        if (!err) {
          const { username, password } = values
          Meteor.loginWithPassword(username, password, (error, result) => {
            if (!error) {
              message.success('登录成功，您可以上传自己喜欢的软件了。')
            } else {
              message.error(`登录失败: ${error.message}`)
            }
          })
        }
      })
    }
  }),
  withTracker(() => {
    return {
      //
    }
  })
)(Login)

const styles = {
  logo: {
    width: '100%',
    padding: 50
  },
  form: {
    position: 'absolute',
    maxWidth: 300,
    top: '50%',
    left: '50%',
    marginLeft: -150,
    marginTop: -300
  },
  forget: {
    float: 'right'
  },
  login: {
    width: '100%'
  }
}
