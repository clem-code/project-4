import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Table, Header, Container, Loader } from 'semantic-ui-react'

export default function Portfolio() {

  const [userData, updateUserData] = useState({})
  const [tradeData, updateTradeData] = useState([])
  const [yourCrypto, updateYourCrypto ] = useState()
  const [yourStocks, updateYourStocks] = useState(null)
  const [quote, updateQuote] = useState('')

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
  console.log(tradeData)

  function filterStocks() {
    return tradeData.filter(trade => {
      if (trade.asset_type === 'stocks') {
        return trade
      }
    })
  }

  function filterCrypto() {
    return tradeData.filter(trade => {
      if (trade.asset_type === 'crypto') {
        return trade
      }
    })
  }

  useEffect(() => {
    const groupedTrades = filterStocks().reduce((acc, trade) => {
      const existingObject = acc.find(obj => obj.name === trade.name_of_asset)
      if (existingObject) {
        existingObject.stocksHeld = existingObject.stocksHeld + trade.qty_purchased
        return acc
      } else {
        return [...acc, {
          name: trade.name_of_asset,
          stocksHeld: trade.qty_purchased,
          pricePaid: trade.total_trade_value
        }]
      }
    }, [])
    updateYourStocks(groupedTrades)
  }, [tradeData])

  useEffect(() => {
    const groupedTrades = filterCrypto().reduce((acc, trade) => {
      const existingObject = acc.find(obj => obj.name === trade.name_of_asset)
      if (existingObject) {
        existingObject.stocksHeld = existingObject.stocksHeld + trade.qty_purchased
        return acc
      } else {
        return [...acc, {
          name: trade.name_of_asset,
          stocksHeld: trade.qty_purchased,
          pricePaid: trade.total_trade_value
        }]
      }
    }, [])
    updateYourCrypto(groupedTrades)
  }, [tradeData])

  useEffect(() => {
    async function fetchQuote(asset) {
      const { data } = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${asset}&token=c189lnf48v6ojusa06gg`)
      updateQuote(data.c)
    }
    fetchQuote()
  }, [])


  return <>
    {!yourStocks || !yourStocks.length ? <Loader active /> : 
      <div className="portfolio-page">
        <h1 style={{ marginTop: 40, marginBottom: 50 }}>{userData.username}'s Portfolio</h1>
        <Grid divided='vertically'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <h2>Available Balance: <span className="balance">${Number(userData.wallet).toFixed(2)}</span></h2>
            </Grid.Column>
            <Grid.Column>
              <h2>Total Spent: <span className="spent">${Number(100000 - userData.wallet).toFixed(2)}</span></h2>
            </Grid.Column>
            <Grid.Column>
              <Container>
                <h2>Trades Completed: {tradeData.length} </h2>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} divided>
            <Grid.Column>
              <Header as='h1' textAlign='left'>Your Stocks</Header>
              <div className="table-holder">
                <Table celled inverted selectable style={{ margin: 10 }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell># Held</Table.HeaderCell>
                      <Table.HeaderCell>Price paid</Table.HeaderCell>
                      <Table.HeaderCell>Current Value</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {yourStocks.map((trade, index) => {
                      return <Table.Row key={index}>
                        <Table.Cell>{trade.name}</Table.Cell>
                        <Table.Cell>{trade.stocksHeld}</Table.Cell>
                        <Table.Cell>${trade.pricePaid}</Table.Cell>
                        <Table.Cell>$10,000</Table.Cell>
                      </Table.Row>
                    })}
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as='h1' textAlign='left'>Your Crypto</Header>
              <div className="table-holder">
                <Table celled inverted selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell># Held</Table.HeaderCell>
                      <Table.HeaderCell>Price paid</Table.HeaderCell>
                      <Table.HeaderCell>Current Value</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                    
                  <Table.Body>
                    {yourCrypto.map((trade, index) => {
                      return <Table.Row key={index}>
                        <Table.Cell>{trade.name}</Table.Cell>
                        <Table.Cell>{trade.stocksHeld}</Table.Cell>
                        <Table.Cell>${trade.pricePaid}</Table.Cell>
                        <Table.Cell>$10,000</Table.Cell>
                      </Table.Row>
                    })}
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
                  
        <Grid columns={2} divided style={{ paddingBottom: '2em' }}>
          <Grid.Row>
            <Grid.Column>
              <Header as='h2' textAlign='center'>Transaction History</Header>
              <div className="table-holder">
                <Table celled inverted selectable style={{ margin: 10 }}>
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
              <img style={{ marginBottom: 40 }} src='https://www.tutorialspoint.com/tables_graphs_functions_and_sequences/images/interpreting_line_graph_example1.jpg' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    }
  </>
}
