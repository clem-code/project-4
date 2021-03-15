import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Image } from 'semantic-ui-react'
import { Table, Header, Statistic, Container, Loader } from 'semantic-ui-react'

export default function Portfolio() {

  const [userData, updateUserData] = useState({})
  const [tradeData, updateTradeData] = useState([])
  const [yourStocks, updateYourStocks] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateUserData(data)
      updateTradeData(data.trades)
    }
    fetchData()

  }, [])

  useEffect(() => {
    const groupedTrades = tradeData.reduce((acc, trade) => {
      const existingObject = acc.find(obj => obj.name === trade.name_of_asset)
      if (existingObject) {
        existingObject.stocksHeld = existingObject.stocksHeld + trade.qty_purchased
        return acc
      } else {
        return [...acc, {
          name: trade.name_of_asset,
          stocksHeld: trade.qty_purchased
        }]
      }
    }, [])
    updateYourStocks(groupedTrades)
  }, [tradeData])

  console.log('YOUR STOCKS>', yourStocks)
  console.log('hello')

  return (

    <>
    {!yourStocks || !yourStocks.length ? <Loader active /> : 

  <div className="portfolio-page">
    <h1 style={{ marginTop: 40, marginBottom: 50 }}>{userData.username}'s Portfolio</h1>
    <Grid divided='vertically'>
      <Grid.Row columns={3}>
        <Grid.Column>
          <h2>Available Balance: ${userData.wallet}</h2>
        </Grid.Column>
        <Grid.Column>
          <h3>Profit/Loss: <span className="profit-loss"> + 6.7%</span></h3>
        </Grid.Column>
        <Grid.Column>
          <Container>
            <Statistic size='mini'>
              <Statistic.Value>54</Statistic.Value>
              <Statistic.Label>trades</Statistic.Label>
            </Statistic>
            <Statistic size='mini'>
              <Statistic.Value>$56,000</Statistic.Value>
              <Statistic.Label>biggest trade</Statistic.Label>
            </Statistic>

          </Container>

        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2} divided>
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
            {yourStocks.map((trade, index) => {
                  return <Table.Row key={index}>
                    <Table.Cell>{trade.name}</Table.Cell>
                    <Table.Cell>{trade.stocksHeld}</Table.Cell>
                    <Table.Cell>$10,000</Table.Cell>
                  </Table.Row>
                })}
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

    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Header as='h2' textAlign='center'>Transaction History</Header>
          <div className="trade-history">
            <Table celled inverted selectable style={{ margin: 20 }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Buy/Sell</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Number of Shares</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>

                {tradeData.map((trade, index) => {
                  return <Table.Row key={index}>
                    <Table.Cell>{trade.name_of_asset}</Table.Cell>
                    <Table.Cell>{trade.transaction_type}</Table.Cell>
                    <Table.Cell textAlign='center'>{trade.qty_purchased}</Table.Cell>
                    <Table.Cell>{trade.asset_price}</Table.Cell>
                  </Table.Row>
                })}
              </Table.Body>
            </Table>
          </div>
        </Grid.Column>
        <Grid.Column>
          <img src='https://www.tutorialspoint.com/tables_graphs_functions_and_sequences/images/interpreting_line_graph_example1.jpg' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    
  </div>
}
</>
  )
  
}
