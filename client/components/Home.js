import React from 'react'

import 'semantic-ui-css/semantic.min.css'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment
} from 'semantic-ui-react'

import { Link } from 'react-router-dom'

export default function Home() {

  return <>
    <Segment
      inverted
      textAlign="center"
      style={{
        minHeight: 350, padding: '1em 0em', paddingBottom: 80,
      }}
      vertical
    >
      <Container text
      >
        <Header
          as="h1"
          content="FOLIO"
          inverted
          style={{
            color: 'teal',
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em'
          }}
        />
        <Header
          as="h2"
          content="Join the Trading Revolution"
          inverted
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em'
          }}
        />
        <Button as={Link} to='/register' primary size="huge">
          Dive In
          <Icon name="right arrow" />
        </Button>
      </Container>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Folio
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              The trading platform for the 21st Century investor.
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Massive Choice
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Choose from tens of thousands of stocks and coins.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="huge"
              src="https://specials-images.forbesimg.com/imageserve/5f2b139cc5d1415541643908/960x0.jpg?fit=scale"
              alt="stock market graphic"
              
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Link to={'/research'}><Button size="huge" color='teal'>Browse Them All</Button></Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled="internally" columns="equal" stackable verticalAlign="middle">
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <p style={{ fontSize: '1.33em' }}>
              <Image  src="https://image.freepik.com/free-vector/digital-bitcoin-technology-concept-background-design_1017-30485.jpg" alt="bitcoin graphic" />
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Buy and sell at the click of a button
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Folio provides a seamless trading experience...
            </p>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Nothing beats the Folio Experience        </Header>
        <p style={{ fontSize: '1.33em' }}>
          No red tape, no delays. Just the best data and the lastest market data at your finger tips. All supported by state-of-the-art infrastructure.
        </p>
        <Button as={Link} to='/register' size="large" color='teal'>
          Just sign-up and dive in...
        </Button>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href="#root">This is what modern trading looks like</a>
        </Divider>
        <Header as="h3" style={{ fontSize: '2em' }}>
          All assets supported
        </Header>
        <Image src={'https://img.freepik.com/free-vector/cryptocurrency-landing-page_52683-12388.jpg?size=626&ext=jpg&ga=GA1.2.778645586.1615912189'} alt="fin tech trading platform graphic" />
        <Divider />
        <Button as={Link} to='/register' size="large" color='teal'>
          Get Trading        </Button>
      </Container>
    </Segment>
  </>
}