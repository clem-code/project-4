import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react'

export default function Footer() {

  return <>
    <Segment inverted vertical style={{ padding: '1em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Who We Are</List.Item>
                <List.Item as="a">Impact</List.Item>
                <List.Item as="a">Media Contacts</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h4" content="Legal" />
              <List link inverted>
                <List.Item as="a">Privacy & Security</List.Item>
                <List.Item as="a">Terma & Conditions</List.Item>
                <List.Item as="a">Global Financial Crimes Complience</List.Item>
                <List.Item as="a">Accessibility</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Connect with us" />
              <List link inverted>
                <List.Item as="a">LinkedIn</List.Item>
                <List.Item as="a">Twitter</List.Item>
                <List.Item as="a">Facebook</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </>
}