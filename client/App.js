import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'
// Components
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import Portfolio from './components/Portfolio'
import Trading from './components/Trading'
import Asset from './components/Asset'
import Research from './components/Research'
import About from './components/About'
import Footer from './components/Footer'

const App = () => (
  <BrowserRouter>
    <Sidebar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/portfolio" component={Portfolio} />
      <Route exact path="/research" component={Research} />
      <Route exact path="/trading" component={Trading} />
      <Route exact path="/asset/:assetId" component={Asset} />
      <Route exact path="/about" component={About} />
    </Switch>
    <Footer />
  </BrowserRouter>
)

export default App
