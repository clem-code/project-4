import React, { useState } from 'react'
import { Grid, Image, Segment, Header, Accordion, Icon } from 'semantic-ui-react'

export default function About() {

  const [faqClicked, updateFaqClicked] = useState(null)


function handleClick(index) {
  const newIndex = faqClicked === index ? null : index
  updateFaqClicked(newIndex)
}

  return <div className="about-page">
  <Grid columns='equal'>
    <Grid.Row stretched>
      <Grid.Column width={10}>
      <Header as='h2' textAlign='center'>How the Website Works:</Header>
        <Segment>
          <Image src='/images/wireframe/paragraph.png' />
        </Segment>
        <Segment>
          <Image src='/images/wireframe/paragraph.png' />
        </Segment>
        <Segment>
          <Image src='/images/wireframe/paragraph.png' />
        </Segment>
      </Grid.Column>
      <Grid.Column>
      <Header as='h2' textAlign='center'>FAQ's</Header>
          <Accordion fluid styled style={{ margin: 15 }}>
            <Accordion.Title active={faqClicked === 0} onClick={() => handleClick(0)}>
              <Icon name='dropdown' />
                Is this real money?!
            </Accordion.Title>
            <Accordion.Content active={faqClicked === 0}>
              <p>
                No, when you register an account you are provided with $100,000 of fake money that you can use to invest in the stocks and crypto of your choosing. You can then track the progress of your investments!
              </p>
           </Accordion.Content>
          </Accordion>
          <Accordion fluid styled style={{ margin: 15 }}>
            <Accordion.Title active={faqClicked === 1} onClick={() => handleClick(1)}>
              <Icon name='dropdown' />
                Do I have to pay anything to use this website?
            </Accordion.Title>
            <Accordion.Content active={faqClicked === 1}>
              <p>
                No, this website is completely free to use.
              </p>
            </Accordion.Content>
          </Accordion>
          <Accordion fluid styled style={{ margin: 15 }}>
            <Accordion.Title active={faqClicked === 2} onClick={() => handleClick(2)}>
              <Icon name='dropdown' />
                Who built this website?
            </Accordion.Title>
            <Accordion.Content active={faqClicked === 2}>
              <p>
                This website was created by Vesna, Clement and Tom as part of the General Assembly Software Engineering Immersive course.
              </p>
            </Accordion.Content>
          </Accordion>
        <Segment>2</Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
</div>

}