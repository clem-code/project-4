import React, { useState } from 'react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'

import {
  Button,
  Container,
  Form,
  Grid,
  Header
} from 'semantic-ui-react'

export default function Register({ history }) {
  /* Error handling!! */
  const [error, updateError] = useState('')
  /* How to define inital state? */
  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    wallet: 100000.00
  })

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const { data } = await axios.post('/api/signup', formData)
      console.log(data)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data._message)
      if (formData.username === '' || formData.email === '' || formData.password === '') {
        updateError('All fields are required!')
      } else {
        updateError('User with this email account is already registered!')
      }
    }
  }


  return <>
    <div className="register">
      <Grid textAlign="center">
        <Container>
          <Header size="huge">Please register</Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              name="username"
              placeholder="Username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            <Form.Input
              name="email"
              placeholder="Email address"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Input
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Checkbox required
              label="I agree to the Terms and Conditions"
            />
            <Button primary fluid size="large" type="submit">
              Register
            </Button>
            <br />
            <p className="error">{ error }</p>
          </Form>
        </Container>
      </Grid>
    </div>
  </>
}
