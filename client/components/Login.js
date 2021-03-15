import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react'


export default function Login({ history }) {
  const [error, updateError] = useState('')
  const [userList, updateUserList] = useState([])
  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    async function getUsers() {
      const { data } = await axios.get('/api/signup')
      updateUserList(data)
    }
    getUsers()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    console.log(event.target)
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    console.log(formData)
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      console.log(data)

      if (localStorage) {
        console.log(localStorage)
        localStorage.setItem('token', data.token)
        const token = data.token
        const payloadAsString = atob(token.split('.')[1])
        const payloadAsObject = JSON.parse(payloadAsString)
        console.log('LOOK HERE', payloadAsObject)
        const userID = payloadAsObject.sub
        console.log('userd ID', userID)

        // const filtered = userList.filter((user) => {
        //   if (user._id === userID) {
        //     return user
        //   }
        // })

        // localStorage.setItem('name', filtered[0].name)
      }
      history.push('/')
    } catch (err) {
      // console.log(err.response.data)
      updateError('Wrong email or password! Try again or register if you don\'t have an account.')
    }
  }

  return <>
    <div className="login">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={formData.email}
                onChange={handleChange}
                name={'email'}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                name={'password'}
              />
              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
            <p className="error">{error}</p>
          </Form>
          <Message>
            New on this website? <a href="/register">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  </>
}