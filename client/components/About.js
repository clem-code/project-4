import React, { useState } from 'react'
import { Grid, Image, Segment, Header, Accordion, Icon, Container } from 'semantic-ui-react'

export default function About() {

  const [faqClicked, updateFaqClicked] = useState(null)


  function handleClick(index) {
    const newIndex = faqClicked === index ? null : index
    updateFaqClicked(newIndex)
  }

  return <div className="about-page">
    <Container>
      <Grid.Column>
        <Header as='h2' textAlign='center' style={{ fontFamily: 'Poppins' }}>FAQ</Header>
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
              This website was created by <a href='https://github.com/ZVesna'>Vesna</a>, <a href='https://github.com/clem-code'>Clement</a> and <a href='https://github.com/Thomas-Briody'>Tom</a> as part of the General Assembly Software Engineering Immersive course.
              </p>
          </Accordion.Content>
        </Accordion>
      </Grid.Column>
    </Container>
    <Grid columns='equal'>
      <Grid.Row stretched>
        <Grid.Column width={10}>
          <Header style={{ fontFamily: 'Poppins' }} as='h2' textAlign='center'>How the Website Works:</Header>
          <Segment>
            <p>Sign up (it's completely free!) and login.</p>
            <Image src='./images/about1.png' />
          </Segment>
          <Segment>
            <p>Have a browse on the research page. Search by ticker symbol NOT company name. <br />For example: enter FB to search for Facebook...</p>
            <Image src='./images/about2.png' />
          </Segment>
          <Segment>
            <p>...and BTC to get Bitcoin!</p>
            <Image src='./images/about3.png' />
          </Segment>
          <Segment>
            <p>When you're ready go to the trade page and make a purchase!</p>
            <Image src='./images/about4.png' />
            <p>But don't worry, we'll double check before you do to make sure you don't make any accidental trades.</p>
            <Image src='./images/about5.png' />
          </Segment>
          <Segment>
            <p>Take a look at your portfolio anytime to see how your investments are doing...</p>
            <Image src='./images/about6.png' />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
}