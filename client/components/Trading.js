import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Select, Button, Icon, Search, Grid, Image, Card, Table, Label, Container, Input, Message, Form } from 'semantic-ui-react'
export default function Trading() {

  const [search, updateSearch] = useState('')
  const [asset, updateAsset] = useState('')
  const [assetClass, updateAssetClass] = useState('stocks')
  const [cryptoName, updateCryptoName] = useState('')
  const [stockName, updateStockName] = useState('')
  const [price, updatePrice] = useState({})
  const [id, updateId] = useState(0)
  const [cryptoImg, updateCryptoImg] = useState('https://cryptoicons.org/api/icon/eth/200')
  const [image, updateImage] = useState('blackboard.com')
  const [quote, updateQuote] = useState('')
  const [tradeQTY, updateTradeQTY] = useState(0)
  const [tradeValue, updateTradeValue] = useState(0)
  const [showTrade, updateShowTrade] = useState(false)





  async function searchFunc() {
    console.log(search)
    const searchTerm = search.toLowerCase()
    const symbolSearch = searchTerm.toUpperCase()
    console.log(symbolSearch)
    if (assetClass === 'stocks') {
      const { data } = await axios.get(`/api/stocks/${symbolSearch}`)
      console.log(data)
      updateId(data.id)
      updateAsset(data.symbol)
      updateStockName(data.name)
      updateSearch('')
    } else {
      const { data } = await axios.get(`/api/crypto/${symbolSearch}`)
      console.log(data)
      updateCryptoName(data.name)
      updateId(data.id)
      updateAsset(data.symbol)
      updateSearch('')
    }
  }
  useEffect(() => {
    async function fetchQuote(asset) {
      const { data } = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${asset}&token=c13rrgf48v6r3f6kt4d0`)
      console.log(data.c)
      updateQuote(data.c)
    }
    async function fetchQuoteCrypto(cryptoName) {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd&include_24hr_change=true`)
      console.log(data, Object.entries(data))
      const type = Object.entries(data)
      console.log(type[0][1].usd)
      updateQuote(type[0][1].usd)

      // updateQuote(data)
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
    console.log(tradeQTY * quote)
    updateTradeValue(tradeQTY * quote)
  }

  return <div>
    Trading Page
    <Input onChange={(event) => updateSearch(event.target.value)} type="text" placeholder='Search...' value={search} />
    <Select placeholder='Select your asset' options={assetOptions} onChange={(event) => updateAssetClass(event.target.innerText.toLowerCase())} />
    <Button primary onClick={searchFunc}>Search</Button>

    {assetClass === 'stocks' && <Grid.Column width={5}>
      <h2>Company Information</h2>
      <Image size='large' wrapped />
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

    <Button secondary onClick={searchFunc}>Buy</Button>

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
        <Form.Input
          fluid
          label='Quantity'
          placeholder={assetClass === 'stocks' ? 'How many shares do you want to buy' : 'How many coins do you want to buy'}
          type='text'
          onChange={(event) => { updateTradeQTY(event.target.value) }}
        />

      </Form.Group>
      <Button secondary onClick={tradeFunc}>Review</Button>
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
      <Form.Input label='Password' type='password' />
      <Form.Checkbox inline label='I agree to the terms and conditions' />
      <Button color='blue'>Submit</Button>
    </Form>
    <Message attached='bottom' warning>
      <Icon name='help' />
      Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
    </Message>

  </div>

}