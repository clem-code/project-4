import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Header, Modal, Select, Button, Icon, Grid, Image, Table, Container, Input, Message, Form, Divider } from 'semantic-ui-react'
export default function Trading() {

  const [search, updateSearch] = useState('')
  const [asset, updateAsset] = useState('')
  const [assetClass, updateAssetClass] = useState('stocks')
  const [cryptoName, updateCryptoName] = useState('')
  const [stockName, updateStockName] = useState('')
  const [userID, updateUserId] = useState('')
  const [userWallet, updateWallet] = useState('')
  const [cryptoImg, updateCryptoImg] = useState('https://cryptoicons.org/api/icon/eth/200')
  const [image, updateImage] = useState('okta.com')
  const [quote, updateQuote] = useState('')
  const [tradeQTY, updateTradeQTY] = useState(0)
  const [tradeValue, updateTradeValue] = useState(0)
  const [showTrade, updateShowTrade] = useState(false)
  const [showConfirm, updateShowConfirm] = useState(false)
  const [open, setOpen] = useState(false)
  const [favouritesData, updateFavouritesData] = useState([])
  const [userData, updateUserData] = useState({})
  const [tradeData1, updateTradeData1] = useState([])
  const [yourStocks, updateYourStocks] = useState(null)
  const [inPortfolio, updateInPortfolio] = useState(false)
  const [showSell, updateShowSell] = useState(false)
  const [maxSell, updateMaxSell] = useState(0)
  const [showAlert, updateShowAlert] = useState(false)

  const token = localStorage.getItem('token')

  //SELLING
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateUserData(data)
      updateTradeData1(data.trades)
      updateFavouritesData(data.favourites)
    }
    fetchData()

  }, [])

  useEffect(() => {
    const groupedTrades = tradeData1.reduce((acc, trade) => {
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
  }, [tradeData1])

  function isInPortfolio(asset) {
    const filtered = yourStocks.filter((stock) => {
      if (stock.name === asset) {
        return stock
      }
    })
    if (filtered.length > 0) {
      updateInPortfolio(true)
      updateMaxSell(Number(filtered[0].stocksHeld))
    } else {
      console.log('This is not in your portfolio')
    }
  }

  function primeSell() {
    toggleBox()
    updateShowSell(true)
  }

  function alert() {
    updateShowAlert(true)
    alert(prompt)
  }

  //BUYING
  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateUserId(data.id)
      updateWallet(data.wallet)
    }
    fetchUser()
  }, [])
  useEffect(() => {
    async function cryptoImg(asset) {
      const { data } = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=88601c6a81a361f8e8413ab689dd66c2&ids=${asset}`)
      updateCryptoImg(data[0].logo_url)
    }
    cryptoImg(asset)
  }, [asset])
  function toggleBox() {
    showTrade ? updateShowTrade(false) : updateShowTrade(true)
  }

  async function searchFunc() {

    const searchTerm = search.toLowerCase()
    const symbolSearch = searchTerm.toUpperCase()
    if (assetClass === 'stocks') {
      const { data } = await axios.get(`/api/stocks/${symbolSearch}`)
      isInPortfolio(data.symbol)
      updateAsset(data.symbol)
      updateStockName(data.name)
      updateSearch('')
    } else {
      const { data } = await axios.get(`/api/crypto/${symbolSearch}`)
      updateCryptoName(data.name)
      updateAsset(data.symbol)
      isInPortfolio(data.symbol)
      updateSearch('')
    }

  }
  async function companyLogo() {
    const { data } = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${asset}&token=c18hab748v6oak5h78g0`)
    const src = data.weburl.slice(8, data.weburl.length - 1).replace('www.', '')
    updateImage(src)
  }
  useEffect(() => {
    async function fetchQuote(asset) {
      const { data } = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${asset}&token=c18hab748v6oak5h78g0`)
      updateQuote(data.c)
      companyLogo()

    }
    async function fetchQuoteCrypto(cryptoName) {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd&include_24hr_change=true`)
      const type = Object.entries(data)
      updateQuote(type[0][1].usd)
    }

    if (assetClass === 'stocks') {
      fetchQuote(asset)
    } else {
      fetchQuoteCrypto(cryptoName)
    }
  }, [asset])
  const assetOptions = [
    { key: 'st', value: 'stocks', text: 'Stocks' },
    { key: 'cr', value: 'crypto', text: 'Crypto' }
  ]
  function tradeFunc() {
    if (inPortfolio && showSell) {
      if (tradeQTY > maxSell) {
        updateShowAlert(true)
        alert()
        location.reload()
      }
    } else if (!showSell && ((tradeQTY * quote) === 0)) {
      updateShowAlert(true)
      alert()
    } else if (!showSell && ((tradeQTY * quote) > userWallet)) {
      updateShowAlert(true)
      alert()
    }
    updateTradeValue(Number(tradeQTY * quote).toFixed(2))
    updateShowConfirm(true)
    updateShowAlert(false)
  }
  function finalTrade() {
    walletAdjust()
    placeTrade()
    setOpen(false)
    location.reload()
  }
  const hidden = { display: 'none' }
  const revealed = { display: 'inline-block' }
  async function walletAdjust() {
    let qtyAfterTrade
    if (showSell) {
      qtyAfterTrade = Number(userWallet) + Number(tradeValue)
    } else {
      qtyAfterTrade = Number(userWallet) - Number(tradeValue)
    }
    const walletData = {
      wallet: qtyAfterTrade
    }
    try {
      const { data } = await axios.put(`/api/${userID}/wallet`, walletData, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.log(err)
    }
  }
  async function placeTrade() {
    let trade

    if (showSell) {
      trade = {
        asset_price: Number(quote),
        qty_purchased: Number(tradeQTY * -1),
        total_trade_value: Number(tradeValue),
        transaction_type: 'sell',
        name_of_asset: asset,
        asset_type: assetClass
      }
    } else {
      trade = {
        asset_price: Number(quote),
        qty_purchased: Number(tradeQTY),
        total_trade_value: Number(tradeValue),
        transaction_type: 'buy',
        name_of_asset: asset,
        asset_type: assetClass
      }
    }

    try {
      const { data } = await axios.post('/api/trades', trade, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
    }
  }

  if (!yourStocks) {
    return null
  }

  function cancelTrade() {
    setOpen(false)
    location.reload()
  }


  return <div>
    <div textAlign='center' verticalAlign='middle' style={{ padding: '5em 3em' }}>
      <h1 style={{ fontFamily: 'Poppins' }}>Time To Trade</h1>
      <h2 style={{ fontFamily: 'Poppins' }}>Available Balance: ${Number(userData.wallet).toFixed(2)}</h2>
    </div>
    <Container>
      <Grid>
        <Grid.Row columns={2} divided>
          <Grid.Column style={{ overflow: 'auto', maxHeight: '330px' }}>
            <Header as='h3' textAlign='left' style={{ fontFamily: 'Poppins' }}>Your Favourites</Header>
            <Table celled inverted selectable >
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
          </Grid.Column>
          <Grid.Column style={{ overflow: 'auto', maxHeight: '330px' }}>
            <Header as='h3' textAlign='left' style={{ fontFamily: 'Poppins' }}>Your Portfolio</Header>
            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Symbol</Table.HeaderCell>
                  <Table.HeaderCell>Quantity Held</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {yourStocks.map((trade, index) => {
                  if (trade.stocksHeld === 0) {
                    return null
                  }
                  return <Table.Row key={index}>
                    <Table.Cell>{trade.name}</Table.Cell>
                    <Table.Cell>{trade.stocksHeld}</Table.Cell>
                  </Table.Row>
                })}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <Divider />
    <Container>
      <div><Select placeholder='Select Your Asset' options={assetOptions} onChange={(event) => updateAssetClass(event.target.innerText.toLowerCase())} /></div>
      <Divider />
      <div><Input onChange={(event) => updateSearch(event.target.value)} type="text" placeholder='Search By Symbol...' value={search} /></div>
      <Divider />
      <div>{token && <Button primary onClick={searchFunc}>Search</Button>}</div>
      <Divider />
      {assetClass === 'stocks' && <Grid.Column width={5}>
        <h2>Company Information</h2>
        <Image size='large' src={`//logo.clearbit.com/${image}`} wrapped />
        <h3>Name: {stockName}</h3>
        <h4>Symbol: {asset}</h4>
        <h4>Share Price (USD): {quote}</h4>
      </Grid.Column>}
      {assetClass === 'crypto' && <Grid.Column width={5}>
        <h2>Coin Information</h2>
        <Image src={cryptoImg} size='small' wrapped />
        <h3>Name: {cryptoName}</h3>
        <h4>Symbol: {asset}</h4>
        <h4>Price (USD): {quote}</h4>
      </Grid.Column>}
      <Divider />
      {token && <Button secondary onClick={toggleBox}>Buy</Button>}
      {inPortfolio && <Button primary onClick={primeSell}>Sell</Button>}
    </Container>
    <Divider />
    <Container style={showTrade ? revealed : hidden}>
      <Message
        attached
        header='Trading'
        content='Enter Trade Data Below'
      />
      <Form className='attached fluid segment'>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Asset Name'
            placeholder='Awaiting Asset Selection'
            type='text'
            value={assetClass === 'stocks' ? `${stockName}` : `${cryptoName}`}
          />
          <Form.Input
            fluid
            label='Asset Price'
            placeholder='Awaiting Asset Selection'
            type='text'
            value={quote}
          />
          {inPortfolio && <Form.Input
            fluid
            label='Current Holdings'
            placeholder='Current Holdings'
            type='text'
            value={maxSell}
          />}
          <Form.Input
            fluid
            label='Quantity'
            placeholder={assetClass === 'stocks' ? 'How many shares do you want to trade' : 'How many coins do you want to trade'}
            type='text'
            onChange={(event) => { updateTradeQTY(event.target.value) }}
          />

        </Form.Group>
        <Divider />
        <Button color='teal' onClick={tradeFunc}>Confirm Order</Button>
        {showAlert && <span style={{ color: 'red' }}><i>Sorry But You Cannot Make That Trade</i></span>}
        <Divider />
        <Table celled style={showConfirm ? revealed : hidden}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Trade Quantity</Table.HeaderCell>
              <Table.HeaderCell>Trade Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {assetClass === 'stocks' ? `${stockName}` : `${cryptoName}`}
              </Table.Cell>
              <Table.Cell>{quote}</Table.Cell>
              <Table.Cell>{tradeQTY}</Table.Cell>
              <Table.Cell>{tradeValue}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Form>
      <Modal
        primary
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={showConfirm && <Button primary>Submit Trade</Button>}
      >
        <Modal.Header><Icon name='money bill alternate' /></Modal.Header>
        <Modal.Content mage>
          <Modal.Description>
            <Header>Confirm Trade</Header>
            <p>
              We need you to confirm this trade before it is placed!
            </p>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Asset</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Trade Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Trade Value</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {assetClass === 'stocks' ? `${stockName}` : `${cryptoName}`}
                  </Table.Cell>
                  <Table.Cell>{quote}</Table.Cell>
                  <Table.Cell>{tradeQTY}</Table.Cell>
                  <Table.Cell>{tradeValue}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={cancelTrade}>
            Not this time
          </Button>
          <Button
            content="Let's do it!"
            labelPosition='right'
            icon='checkmark'
            onClick={finalTrade}
            positive
          />
        </Modal.Actions>
      </Modal>
    </Container>
  </div >
}