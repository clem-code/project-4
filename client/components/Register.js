import React, { useState } from 'react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export default function Register({ history }) {
  const [error, updateError] = useState('')
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
      history.push('/login')
    } catch (err) {
      if (formData.username === '' || formData.email === '' || formData.password === '') {
        updateError('All fields are required!')
      } else {  
        updateError('User already exists.')
      }
    }
  }

  return <>
    <div className="register">
      <Grid textAlign="center" verticalAlign="middle" style={{ minHeight: 530, paddingTop: 80, paddingBottom: 80 }}>
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h2" color="teal" textAlign="center" style ={{ fontFamily: 'Poppins' }}>
            Create an account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                name={'username'}
              />
              <Form.Input
                fluid
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                name={'email'}
              />
              <Form.Input
                fluid
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                name={'password'}
              />
              <Form.Checkbox required
                label="I agree to the Terms and Conditions"
              />
              <Button color="teal" fluid size="large">
                Register
              </Button>
            </Segment>
            <p className="error">{error}</p>
          </Form>
          <Message>
            Already have an account? <a href="/login">Login</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  </>
}