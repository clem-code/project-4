import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Icon, Menu, Button } from 'semantic-ui-react'

const SidebarComponent = ({ history }) => {

  const [changelogin, updateChangeLogin] = useState(false)

  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    updateChangeLogin(!changelogin)
    history.push('/')
  }
  return <div>
    <Menu className="menu-container" inverted widths='8' size='large' stackable>
      <Menu.Item as={Link} to='/'> 
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as={Link} to='/portfolio'>
        <Icon name='briefcase' />
        Portfolio
      </Menu.Item>
      <Menu.Item as={Link} to='/research'>
        <Icon name='magnify' />
        Research
      </Menu.Item>
      <Menu.Item as={Link} to='/trading'>
        <Icon name='chart line' />
        Trading
      </Menu.Item>
      <Menu.Item as={Link} to='/login'>
        <Icon name='sign in' />
        Login
      </Menu.Item>
      <Menu.Item as={Link} to='/register'>
        <Icon name='plus circle' />
        Register
      </Menu.Item>
      <Menu.Item as={Link} to='/about'>
        <Icon name='help' />
        About
      </Menu.Item>
      <Menu.Item>
        {token && <Button onClick={handleLogout}>
          <strong>Logout</strong>
        </Button>}
      </Menu.Item>
    </Menu>
  </div>
}

export default withRouter(SidebarComponent)
