import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Header, Icon, Image, Menu, Segment, Sidebar, Button} from 'semantic-ui-react'



export default function SidebarComponent() {

  return <div>
    <Menu className="menu-container" inverted widths='7' size='large' stackable>
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
    <p className='mr-5 has-text-dark'>{localStorage.getItem('name') ? `Welcome ${localStorage.getItem('name')}!` : ''}</p>
   
      </Menu>
  </div>
}
