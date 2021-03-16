import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Button, Icon, Search, Grid, Image, Card, Table, Select, Divider } from 'semantic-ui-react'
import { remove, shuffle } from 'lodash'
import Ticker from 'react-ticker'


export default function Research() {
  const [search, updateSearch] = useState('')
  const [asset, updateAsset] = useState('')
  const [assetClass, updateAssetClass] = useState('stocks')
  const [cryptoName, updateCryptoName] = useState('')
  const [company, updateCompanies] = useState({})
  const [cryptoData, updateCryptoData] = useState({ market_data: '', marketcap: '' })
  const [cryptoImg, updateCryptoImg] = useState('https://cryptoicons.org/api/icon/eth/200')
  const [price, updatePrice] = useState({})
  const [id, updateId] = useState(0)
  const [userId, updateUserId] = useState(0)
  const [favourites, updateFavourites] = useState([])
  const [image, updateImage] = useState('blackboard.com')
  const [quote, updateQuote] = useState('')
  const [news, updateNews] = useState([])
  const [dow, updateDow] = useState('')
  const [nasdaq, updateNasdaq] = useState('')
  const [sandp, updateSandp] = useState('')
  const [dowC, updateDowC] = useState('')
  const [nasdaqC, updateNasdaqC] = useState('')
  const [sandpC, updateSandpC] = useState('')
  const [btc, updateBTC] = useState('')
  const [eth, updateETH] = useState('')
  const [tether, updateTether] = useState('')
  const [btcC, updateBTCC] = useState('')
  const [ethC, updateETHC] = useState('')
  const [tetherC, updateTetherC] = useState('')

  const assetOptions = [
    { key: 'st', value: 'stocks', text: 'Stocks' },
    { key: 'cr', value: 'crypto', text: 'Crypto' }
  ]
  async function searchFunc() {
    const searchTerm = search.toLowerCase()
    const symbolSearch = searchTerm.toUpperCase()
    if (assetClass === 'stocks') {
      const { data } = await axios.get(`/api/stocks/${symbolSearch}`)
      console.log(data)
      updateId(data.id)
      updateAsset(data.symbol)
    } else {
      const { data } = await axios.get(`/api/crypto/${symbolSearch}`)
      updateCryptoName(data.name)
      updateId(data.id)
      updateAsset(data.symbol)
    }
  }
  // async function get_user_id() {
  //   const { data } = await axios.get('http://localhost:5000/api/profile')
  //   const userId = data.id
  //   updateUserId(userId)
  //   const favourites = data.favourites
  //   updateFavourites(data.favourites)
  //   console.log(userId, favourites)
  // }
  useEffect(() => {
    async function cryptoImg(asset) {
      const { data } = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=e999ef911093392494fc15a4c67d84b4&ids=${asset}`)
      updateCryptoImg(data[0].logo_url)
    }
    cryptoImg(asset)
  }, [asset])


  useEffect(() => {
    async function fetchInfo(asset) {
      if (assetClass === 'stocks') {
        const { data } = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${asset}&token=c13rrgf48v6r3f6kt4d0`)
        console.log(data)
        updateCompanies(data)
        const src = data.weburl.slice(8, data.weburl.length - 1).replace('www.', '')
        updateImage(src)
      }
      else {
        const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${cryptoName}/metrics`)
        updateCryptoData(data.data)
      }
    }
    async function fetchQuote(asset) {
      const { data } = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${asset}&token=c13rrgf48v6r3f6kt4d0`)
      updateQuote(data.c)
    }

    if (asset.length > 0) {
      fetchInfo(asset)
      fetchQuote(asset)
    }
  }, [asset])

  useEffect(() => {
    async function fetchNews() {
      const { data } = await axios.get('https://api.nytimes.com/svc/news/v3/content/nyt/business.json?api-key=LloagDB4NUM7hAC2OOP6deCVztdY1Dvj')
      const filtered = data.results.filter((e) => {
        return e.multimedia !== null
      })
      const shuffled = _.shuffle(filtered).slice(0, 6)
      updateNews(shuffled)
    }
    fetchNews()
  }, [])
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('https://api.twelvedata.com/price?symbol=DJI&type=Index&apikey=1222b4bc258246d498d11e610aed0baa')
      const dow = Number(data.price).toFixed(2)
      updateDow(dow)
    }
    async function fetchData1() {
      const { data } = await axios.get('https://api.twelvedata.com/price?symbol=IXIC&type=Index&apikey=1222b4bc258246d498d11e610aed0baa')
      const nasdaq = Number(data.price).toFixed(2)
      updateNasdaq(nasdaq)
    }
    async function fetchData2() {
      const { data } = await axios.get('https://api.twelvedata.com/price?symbol=GSPC&type=Index&apikey=1222b4bc258246d498d11e610aed0baa')
      const sandp = Number(data.price).toFixed(2)
      updateSandp(sandp)
    }
    async function fetchData3() {
      const { data } = await axios.get('https://api.twelvedata.com/quote?symbol=DJI&type=Index&apikey=1222b4bc258246d498d11e610aed0baa')
      const dow = Number(data.previous_close).toFixed(2)
      updateDowC(dow)
    }
    async function fetchData4() {
      const { data } = await axios.get('https://api.twelvedata.com/quote?symbol=IXIC&type=Index&apikey=1222b4bc258246d498d11e610aed0baa')
      const nasdaq = Number(data.previous_close).toFixed(2)
      updateNasdaqC(nasdaq)
    }
    async function fetchData5() {
      const { data } = await axios.get('https://api.twelvedata.com/quote?symbol=GSPC&type=Index&apikey=1222b4bc258246d498d11e610aed0baa')
      const sandp = Number(data.previous_close).toFixed(2)
      updateSandpC(sandp)
    }
    async function fetchData6() {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
      const btc = Number(data.bitcoin.usd).toFixed(2)
      updateBTC(btc)
      const btcC = Number(data.bitcoin.usd_24h_change).toFixed(2)
      updateBTCC(btcC)
    }
    async function fetchData7() {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true')
      const eth = Number(data.ethereum.usd).toFixed(2)
      updateETH(eth)
      const ethC = Number(data.ethereum.usd_24h_change).toFixed(2)
      updateETHC(ethC)
    }
    async function fetchData8() {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd&include_24hr_change=true')
      const tether = Number(data.tether.usd).toFixed(2)
      updateTether(tether)
      const tetherC = Number(data.tether.usd_24h_change).toFixed(2)
      updateTetherC(tetherC)
    }
    fetchData()
    fetchData1()
    fetchData2()
    fetchData3()
    fetchData4()
    fetchData5()
    fetchData6()
    fetchData7()
    fetchData8()
  }, [])
  if (!company) {
    return null
  }
  if (!cryptoData) {
    return null
  }
  const cardStyle = {
    minHeight: 400,
    backgroundColor: 'teal',
    border: 'solid 2px black'
  }


  return <div>
    <Grid textAlign="center" verticalAlign="middle" style={{ padding: '6em 3em 2em 3em' }}>
      <h1>Discover // Research // Invest</h1>
      <Grid.Row columns={6}>
        {news.map((box, index) => {
          return <Grid.Column key={index}>
            <Card className="newsbox" href={box.url} target="_blank" rel="noreferrer" style={cardStyle}>
              <Image src={`${box.thumbnail_standard}`} size='medium' />
              <Card.Content>
                <Card.Header style={{ color: 'white' }}>{box.section}</Card.Header>
                <Card.Description style={{ color: 'white' }}>
                  {box.title}
                </Card.Description>
              </Card.Content>
              <Card.Content extra style={{ color: 'white' }}>
                <Icon name='newspaper outline' style={{ color: 'white' }} />
                Powered by the New York Times
              </Card.Content>
            </Card>
          </Grid.Column>
        })}
      </Grid.Row>
    </Grid>
    <Divider/>    
    <Grid textAlign="center" verticalAlign="middle" style={{ padding: '3em 0em' }}>
      <Grid.Row>
        <Grid.Column width={6}>
          <h1>Major Stock Indices</h1>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Dow Jones</Table.HeaderCell>
                <Table.HeaderCell>Nasdaq</Table.HeaderCell>
                <Table.HeaderCell>S&P500</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {`$${dow}`}
                </Table.Cell>
                <Table.Cell>{`$${nasdaq}`}</Table.Cell>
                <Table.Cell>{`$${sandp}`}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{`${(((dow - dowC) / dowC) * 100).toFixed(2)}%`}</Table.Cell>
                <Table.Cell>{`${(((nasdaq - nasdaqC) / nasdaqC) * 100).toFixed(2)}%`}</Table.Cell>
                <Table.Cell>{`${(((sandp - sandpC) / sandpC) * 100).toFixed(2)}%`}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={6}>
          <h1>Key Crypto Prices</h1>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Bitcoin</Table.HeaderCell>
                <Table.HeaderCell>Etherum</Table.HeaderCell>
                <Table.HeaderCell>Tether</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {`$${btc}`}
                </Table.Cell>
                <Table.Cell>{`$${eth}`}</Table.Cell>
                <Table.Cell>{`$${tether}`}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{`${btcC}%`}</Table.Cell>
                <Table.Cell>{`${ethC}%`}</Table.Cell>
                <Table.Cell>{`${tetherC}%`}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider/>
    <Grid textAlign="center" verticalAlign="middle" style={{ padding: '2em 0em 5em 0em' }}>
      <Grid.Row>
        <Search
          onSearchChange={(event) => updateSearch(event.target.value)} type="text" placeholder="Search Assets..." style={{ margin: '0em 1em' }}
        />
        <Select placeholder='Select your asset' options={assetOptions} onChange={(event) => updateAssetClass(event.target.innerText.toLowerCase())} />
        <Button
          color='blue'
          content='Search'
          onClick={searchFunc}
          style={{ margin: '0em 2em' }}
        />
      </Grid.Row>
      <Grid.Row>
        {assetClass === 'stocks' && <Grid.Column textAlign="center" verticalAlign="middle">
          <Grid.Row style={{ margin: '2em 0em 4em 0em' }}>
            <h2>Company Information</h2>
          </Grid.Row>
          <Grid.Row columns={2} style={{ margin: '0em 5em' }}>
            <Grid.Column>
              <Link to={{
                pathname: `/asset/${id}`,
                state: { assetState: asset, nameState: company.name, quoteState: quote, assetType: 'stocks', img: image }
              }}>
                <Image src={`//logo.clearbit.com/${image}`} size='large' wrapped />
                <h3>Name: {company.name}</h3>
                <h4>Share Price (USD): {quote}</h4>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <p>Exchange: {company.exchange}</p>
              <p>Currency: {company.currency}</p>
              <p>Symbol: {company.ticker}</p>
              <p>Sector: {company.finnhubIndustry}</p>
              <p>Country: {company.country}</p>
              <p>IPO: {company.ipo}</p>
              <p>Website: <a target="_blank" rel="noreferrer" href={company.weburl}>{company.weburl}</a></p>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>}
        {assetClass === 'crypto' && <Grid.Column textAlign="center" verticalAlign="middle">
          <Grid.Row style={{ margin: '2em 0em 4em 0em' }}>
            <h2>Coin Information</h2>
          </Grid.Row>
          <Grid.Row columns={2} style={{ margin: '0em 5em' }}>
            <Grid.Column>
              <Link to={{
                pathname: `/asset/${id}`,
                state: { assetState: asset, nameState: cryptoData.name, quoteState: cryptoData.market_data.price_usd, dataState: cryptoData, assetType: 'crypto', mktCap: cryptoData.marketcap.current_marketcap_usd, img: cryptoImg }
              }}>
                <Image src={cryptoImg} size='small' wrapped />
                <h3>Name: {cryptoData.name}</h3>
                <h4>Price (USD): {cryptoData.market_data.price_usd}</h4>
                <h4>Price (BTC): {cryptoData.market_data.price_btc}</h4>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>}
      </Grid.Row>
      <Grid.Row>
        <Link to={assetClass === 'stocks' ? {
          pathname: `/asset/${id}`,
          state: { assetState: asset, nameState: company.name, quoteState: quote, img: image, assetType: 'stocks' }
        } : {
          pathname: `/asset/${id}`,
          state: { assetState: asset, nameState: cryptoData.name, quoteState: cryptoData.market_data.price_usd, dataState: cryptoData, assetType: 'crypto', mktCap: cryptoData.marketcap.current_marketcap_usd, img: cryptoImg }
        }}><Button color='teal' animated style={{ margin: '0em 1em' }}>
            <Button.Content visible>Learn More</Button.Content>
            <Button.Content hidden>
              <Icon name='chart line' />
            </Button.Content>
          </Button></Link>
        <Button color='orange' animated style={{ margin: '0em 1em' }}>
          <Button.Content visible>Favourite</Button.Content>
          <Button.Content hidden>
            <Icon name='star' />
          </Button.Content>
        </Button>
        <Link to={'/trading'}>
          <Button color='purple' animated style={{ margin: '0em 1em' }}>
            <Button.Content visible>Trade</Button.Content>
            <Button.Content hidden>
              <Icon name='handshake outline' />
            </Button.Content>
          </Button>
        </Link>
      </Grid.Row> 
    </Grid>
  </div >
}
