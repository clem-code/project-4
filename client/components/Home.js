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
      style={{ minHeight: 350, padding: '1em 0em', paddingBottom: 80 }}
      vertical
    >
      <Container text>
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
              size="large"
              src="https://specials-images.forbesimg.com/imageserve/5f2b139cc5d1415541643908/960x0.jpg?fit=scale"
              alt="image"
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
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Buy and sell at the click of a button
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Folio provides a seamless trading experience...
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              I should not have gone with their competitor.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src="" alt="image" />
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned
          how to master the art of doing nothing by providing massive amounts of
          whitespace and generic content that can seem massive, monolithic and
          worth your attention.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href="#root">Case Studies</a>
        </Divider>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur
          filler content, but it is really true. It took years of gene splicing
          and combinatory DNA research, but our bananas can really dance.
        </p>
        <Button as="a" size="large">
          I am Still Quite Interested
        </Button>
      </Container>
    </Segment>
  </>
}