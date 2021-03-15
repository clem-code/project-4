import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Image } from 'semantic-ui-react'
import { Table, Header } from 'semantic-ui-react'

export default function Portfolio() {

  const [userFavourites, updateUserFavourites] = useState([])

  // const [userInfo, updateUserInfo] = useState([])

    useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/profile')
      updateUserFavourites(data)
    }
    fetchData()
  }, [])

    function mapUserData() {
    return userFavourites.map((data, index) => {
      return <div key={index}>
        <h1>{data}</h1>
      </div>
    })
  }
  mapUserData()
  console.log(userFavourites)
  // console.log('DATA>', data)

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data } = await axios.get('/api/stocks')
  //     updateUserInfo(data)
  //   }
  //   fetchData()
  // }, [])

  // function mapUserData() {
  //   return userInfo.map((data, index) => {
  //     return <div key={index}>
  //       <h1>{data}</h1>
  //     </div>
  //   })
  // }
  // mapUserData()
  return <div className="portfolio-page">
    <h1 style={{ margin: 40 }}>Toms Portfolio</h1>
      <Grid divided='vertically'>
    <Grid.Row columns={3}>
      <Grid.Column>
        <h3>Available Balance: $65,456</h3>
      </Grid.Column>
      <Grid.Column>
      <h3>Profit/Loss: <span className="profit-loss"> + 6.7%</span></h3>
      </Grid.Column>
      <Grid.Column>
        <p>Graph to go here?</p>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={2}>
      <Grid.Column>
      <Header as='h1' textAlign='left'>Your Stocks</Header>
      <Table celled inverted selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell># Held</Table.HeaderCell>
        <Table.HeaderCell>Current Value</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>GOOG</Table.Cell>
        <Table.Cell>5</Table.Cell>
        <Table.Cell>$10,000</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>TSLA</Table.Cell>
        <Table.Cell>5</Table.Cell>
        <Table.Cell>$3,500</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>AAPL</Table.Cell>
        <Table.Cell>7</Table.Cell>
        <Table.Cell>$954</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Grid.Column>
      <Grid.Column>
      <Header as='h1' textAlign='left'>Your Crypto</Header>
      <Table celled inverted selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell># Held</Table.HeaderCell>
        <Table.HeaderCell>Current Value</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>BTC</Table.Cell>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>$70,000</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>ETH</Table.Cell>
        <Table.Cell>0.5</Table.Cell>
        <Table.Cell>$704</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>LTC</Table.Cell>
        <Table.Cell>5</Table.Cell>
        <Table.Cell>$869</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    {userFavourites}
</div>

}