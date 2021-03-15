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
                What is a dog?
            </Accordion.Title>
            <Accordion.Content active={faqClicked === 0}>
              <p>
                A dog is a type of domesticated animal. Known for its loyalty and
                faithfulness, it can be found as a welcome guest in many households
                across the world.
              </p>
        </Accordion.Content>
      </Accordion>
      <Accordion fluid styled style={{ margin: 15 }}>
            <Accordion.Title active={faqClicked === 1} onClick={() => handleClick(1)}>
              <Icon name='dropdown' />
                What is a cat?
            </Accordion.Title>
            <Accordion.Content active={faqClicked === 1}>
              <p>
                BLAH BLAH BLAH
              </p>
        </Accordion.Content>
      </Accordion>
        <Segment>2</Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
</div>

}