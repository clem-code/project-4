import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Header, Grid, Container, Loader } from 'semantic-ui-react'

export default function Portfolio() {

  const [userData, updateUserData] = useState(null)
  const [tradeData, updateTradeData] = useState([])
  const [yourCrypto, updateYourCrypto] = useState()
  const [yourStocks, updateYourStocks] = useState(null)
  const [favouritesData, updateFavouritesData] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateUserData(data)
      updateTradeData(data.trades)
      updateFavouritesData(data.favourites)
    }
    fetchData()
  }, [])

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
    const helperFunction = async () => {
      const stocks = filterStocks()
      const stockNames = [...new Set(stocks.map((stock) => stock.name_of_asset))]

      const stockPrices = await Promise.all(stockNames.map(async (stockName) => ({ name: stockName, price: await getPrice(stockName) })))
      const groupedTrades = filterStocks().reduce((acc, trade) => {

        const existingObject = acc.find(obj => obj.name === trade.name_of_asset)
        if (existingObject) {
          existingObject.stocksHeld = existingObject.stocksHeld + trade.qty_purchased
          existingObject.pricePaid = existingObject.pricePaid + trade.total_trade_value
          existingObject.currentValue = existingObject.stocksHeld * (stockPrices.find(price => price.name === trade.name_of_asset).price)
          return acc
        } else {
          return [...acc, {
            name: trade.name_of_asset,
            stocksHeld: trade.qty_purchased,
            pricePaid: trade.total_trade_value,
            currentValue: (stockPrices.find(price => price.name === trade.name_of_asset).price) * trade.qty_purchased
          }]
        }
      }, [])
      updateYourStocks(groupedTrades)
    }
    helperFunction()
  }, [tradeData])


  useEffect(() => {
    const helperFunctionCrypto = async () => {
      const crypto = filterCrypto()
      const cryptoNames = [...new Set(crypto.map((crypto) => crypto.name_of_asset))]

      const cryptoPrices = await Promise.all(cryptoNames.map(async (cryptoName) => ({ name: cryptoName, price: await getCryptoPrice(cryptoName) })))
      const groupedTrades = filterCrypto().reduce((acc, trade) => {
        const existingObject = acc.find(obj => obj.name === trade.name_of_asset)
        if (existingObject) {
          existingObject.stocksHeld = existingObject.stocksHeld + trade.qty_purchased
          existingObject.pricePaid = existingObject.pricePaid + trade.total_trade_value
          existingObject.currentValue = existingObject.stocksHeld * (cryptoPrices.find(price => price.name === trade.name_of_asset).price) 
          return acc
        } else {
          return [...acc, {
            name: trade.name_of_asset,
            stocksHeld: trade.qty_purchased,
            pricePaid: trade.total_trade_value,
            currentValue: (cryptoPrices.find(price => price.name === trade.name_of_asset).price) * trade.qty_purchased
          }]
        }
      }, [])
      updateYourCrypto(groupedTrades)
    }
    helperFunctionCrypto()
  }, [tradeData])


  async function getPrice(asset) {
    const ticker = asset.toUpperCase()
    const { data } = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=c18hab748v6oak5h78g0`)
    return data.c.toFixed(2)

  }

  async function getCryptoPrice(cryptoName) {
    const ticker = cryptoName.toLowerCase()
    const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${ticker}/metrics`)
    return data.data.market_data.price_usd.toFixed(2)
  }

  return (
    <>
      <div className="portfolio-page">
        {!userData ? <Loader active /> :
          <>
            <h1 style={{ marginTop: 40, marginBottom: 50, fontFamily: 'Poppins' }}>{userData.username}'s Portfolio</h1>
            <Grid divided='vertically'>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <h2 style={{ fontFamily: 'Poppins' }}>Available Balance: <span className="balance">${Number(userData.wallet).toFixed(2)}</span></h2>
                </Grid.Column>
                <Grid.Column>
                  <h2 style={{ fontFamily: 'Poppins' }}>Total Spent: <span className="spent">${Number(100000 - userData.wallet).toFixed(2)}</span></h2>
                </Grid.Column>
                <Grid.Column>
                  <Container>
                    <h2 style={{ fontFamily: 'Poppins' }}>Trades Completed: {tradeData.length} </h2>
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} divided>
                <Grid.Column>
                  <Header as='h1' textAlign='left' style={{ fontFamily: 'Poppins' }}>Your Stocks</Header>
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
                        {yourStocks && yourStocks.map((trade, index) => {
                          return <Table.Row key={index}>
                            <Table.Cell>{trade.name}</Table.Cell>
                            <Table.Cell>{trade.stocksHeld}</Table.Cell>
                            <Table.Cell>${trade.pricePaid}</Table.Cell>
                            <Table.Cell>${trade.currentValue.toFixed(2)}</Table.Cell>
                          </Table.Row>
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h1' textAlign='left' style={{ fontFamily: 'Poppins' }}>Your Crypto</Header>
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
                        {yourCrypto && yourCrypto.map((trade, index) => {
                          return <Table.Row key={index}>
                            <Table.Cell>{trade.name}</Table.Cell>
                            <Table.Cell>{trade.stocksHeld}</Table.Cell>
                            <Table.Cell>${trade.pricePaid}</Table.Cell>
                            <Table.Cell>${trade.currentValue.toFixed(2)}</Table.Cell>
                          </Table.Row>
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Header as='h2' textAlign='center' style={{ fontFamily: 'Poppins' }}>Transaction History</Header>
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
                            <Table.Cell>£{trade.asset_price.toFixed(2)}</Table.Cell>
                          </Table.Row>
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h2' textAlign='center' style={{ fontFamily: 'Poppins' }}>Your Favourites</Header>
                  <div className="table-holder">
                    <Table celled inverted selectable style={{ margin: 10 }}>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Symbol</Table.HeaderCell>
                          <Table.HeaderCell>Asset Class</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {favouritesData.map((trade, index) => {
                          return <Table.Row key={index}>
                            <Table.Cell>{trade.name}</Table.Cell>
                            <Table.Cell>{trade.symbol}</Table.Cell>
                            <Table.Cell>{trade.type_of}</Table.Cell>
                          </Table.Row>
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </>
        }
      </div>
    </>
  )
}
