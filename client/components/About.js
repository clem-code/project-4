import React, { useState } from 'react'
import { Grid, Image, Segment, Header, Accordion, Icon } from 'semantic-ui-react'

export default function About() {

  return <div className="about-page">
    <Header as='h1' textAlign='center' style={{ marginBottom: 70 }}>About this website</Header>
  <Grid columns='equal'>
    <Grid.Row stretched>
      <Grid.Column width={10}>
      <Header as='h2' textAlign='center'>How the Website Works:</Header>
        <Segment>
          <Image src='/images/wireframe/paragraph.png' /> image to go here
        </Segment>
        <Segment>
          <Image src='/images/wireframe/paragraph.png' /> image to go here
        </Segment>
        <Segment>
          <Image src='/images/wireframe/paragraph.png' /> image to go here
        </Segment>
      </Grid.Column>
      <Grid.Column>
      <Header as='h2' textAlign='center'>FAQ's</Header>
      <Segment>
        <Header as='h5' textAlign='left'>Who built this website?</Header>
          <Segment>This website was built by Clement Knox, Vesna Zivanovic and Tom Briody</Segment>
      </Segment>
      <Segment>
        <Header as='h5' textAlign='left'>How long did it take?</Header>
          <Segment>The project was built over the course of 1 week</Segment>
      </Segment>
      <Segment>
        <Header as='h5' textAlign='left'>Is this real money?!</Header>
          <Segment>No, upon registering you are provided with $100,000 of fake money that you can invest.</Segment>
      </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
</div>

}