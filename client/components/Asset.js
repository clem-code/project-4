import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Icon, Search, Grid, Image, Card, Table, Label, Container } from 'semantic-ui-react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalGridLines } from 'react-vis'

export default function Asset({ location }) {
  const [financials, updateFinancials] = useState([])
  const [cryptoDescription, updatecryptoDescription] = useState([])
  const [cryptoMetrics, updateCryptoMetrics] = useState([])
  const [cryptoBackground, updatecryptoBackground] = useState([])
  const [cryptoTechnology, updatecryptoTechnology] = useState([])
  const [ratios, updateRatios] = useState([])
  const [showFinancials, updateShowFinancials] = useState(false)
  const [showCrypto, updateShowCrypto] = useState(false)
  const [graphData, updateGraphData] = useState([])
  const [xyData, updateXYData] = useState([])
  const [xyDataParam, updateXYDataParam] = useState('')
  const [mktCap, updateMktCap] = useState('')
  const asset = location.state.assetState
  const assetName = location.state.nameState
  const quote = location.state.quoteState
  const assetType = location.state.assetType
  const image = location.state.img

  useEffect(() => {
    async function getMktCap() {
      const { data } = await axios.get(`https://financialmodelingprep.com/api/v3/market-capitalization/${asset}?apikey=8e17a4dcd9894ebe5fc45645972dffa7`)
      updateMktCap(data[0].marketCap)
    }
    getMktCap()
  }, [])
  useEffect(() => {
    async function getCryptoMetrics() {
      const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${asset}/metrics`)
      const blockchain = Object.entries(data.data.blockchain_stats_24_hours)
      const metrics = Object.entries(data.data.roi_data)
      const combined = [...blockchain, ...metrics]
      updateCryptoMetrics(combined)
    }
    getCryptoMetrics()
  }, [])
  if (assetType === 'crypto') {
    useEffect(() => {
      async function getCryptoDescription() {
        const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${assetName}/profile`)
        updatecryptoDescription(data.data.overview)
        updatecryptoBackground(data.data.background)
        updatecryptoTechnology(data.data.technology)
      }
      getCryptoDescription()
    }, [])
  }
  useEffect(() => {
    async function tableData() {
      const { data } = await axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${asset}&metric=all&token=c13rrgf48v6r3f6kt4d0`)
      updateFinancials(Object.entries(data.metric))
    }
    tableData()
  }, [])

  useEffect(() => {
    async function ratioData() {
      const { data } = await axios.get(`https://financialmodelingprep.com/api/v3/ratios-ttm/${asset}?apikey=8e17a4dcd9894ebe5fc45645972dffa7`)
      updateRatios(Object.entries(data[0]))
    }
    ratioData()
  }, [])


  useEffect(() => {

    async function graphFunc() {
      const { data } = await axios.get(`http://api.marketstack.com/v1/eod?access_key=b423407c1ef7cdb1569a2f04fc263513&symbols=${asset}`)
      updateGraphData(data.data)
    }
    async function cryptoGraphFunc() {
      const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${asset}/metrics/price/time-series?start=2021-01-01&interval=1d`)
      const cryptoTimeSeries = data.data.values.reverse()
      updateGraphData(cryptoTimeSeries)

    }
    if (assetType !== 'crypto') {
      graphFunc()
    } else {
      cryptoGraphFunc()
    }

  }, [])
  useEffect(() => {
    async function graphFunc1() {
      const dataPointArray = []
      for (let index = 0; index < graphData.length; index++) {
        const dataPoint = {
          x: Number(`${index}`), y: Number(`${graphData[index].close}`)
        }
        dataPointArray.unshift(dataPoint)
      }
      updateXYData(dataPointArray)
      updateXYDataParam(dataPointArray.length)
    }
    async function cryptoGraphFunc1() {
      const dataPointArray = []
      for (let index = 0; index < graphData.length; index++) {
        const dataPoint = {
          x: Number(`${index}`), y: Number(`${graphData[index][4]}`)
        }
        dataPointArray.unshift(dataPoint)
      }
      updateXYData(dataPointArray)
      updateXYDataParam(dataPointArray.length)
    }
    if (assetType !== 'crypto') {
      graphFunc1()
    } else {
      cryptoGraphFunc1()
    }
  }, [graphData])

  function revealFinancials() {
    if (showFinancials) {
      updateShowFinancials(false)
    } else {
      updateShowFinancials(true)
    }
  }
  function revealMore() {
    if (showCrypto) {
      updateShowCrypto(false)
    } else {
      updateShowCrypto(true)
    }
  }

  if (!graphData) {
    return null
  }
  if (!financials) {
    return null
  }
  if (!cryptoMetrics) {
    return null
  }
  const hidden = { overflow: 'auto', maxHeight: '500px', display: 'none' }
  const revealed = { overflow: 'auto', maxHeight: 300, display: 'inline-block' }

  return <div>
    <h1>{assetName}</h1>
    <Image src={assetType !== 'crypto' ? `//logo.clearbit.com/${image}` : image} size={assetType !== 'crypto' ? 'large' : 'tiny'} wrapped />
    <h3>Share Price (USD): {Number(quote).toFixed(2)}</h3>
    <h3>Market Capitalization (USD) {assetType === 'crypto' ? location.state.mktCap : Number(mktCap).toFixed(2)}</h3>
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <XYPlot height={500} width={500} xDomain={[Number(`${xyDataParam}`), 0]}  >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title='Three Month Performance' />
            <YAxis title='Asset Price (USD)' style={{ fontSize: '10px' }} />
            <LineSeries color="purple" data={xyData} />
          </XYPlot>
        </Grid.Column>


        {assetType !== 'crypto' && <Grid.Column>
          Key Ratios & Multiples
          <Container style={revealed}>
            <Grid >
              <Grid.Row >
                {ratios.map((data, index) => {
                  if (data[1] !== null && data[1] !== 0)
                    return <><Grid.Column key={index} width={3} >
                      < Table celled >
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell style={{ fontSize: '12px' }}>{data[0]}</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              {Number(data[1]).toFixed(2)}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                    </>
                })}
              </Grid.Row>
            </Grid>
          </Container>
        </Grid.Column>}

        {assetType === 'crypto' && <Grid.Column>
          <h4>Description</h4>
          <Container style={revealed}>{cryptoDescription}</Container>
          <h4>Metrics</h4>
          <Container style={revealed}>
            <Grid>
              <Grid.Row>
                {cryptoMetrics.map((data, index) => {
                  if (data[1] !== null && data[1] !== 0)
                    return <div key={index}>
                      <Grid.Column key={index} width={3} >
                        < Table celled >
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>{data[0]}</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                {data[1]}
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </Grid.Column>
                    </div>
                })}
              </Grid.Row>
            </Grid>
          </Container>
        </Grid.Column>}
      </Grid.Row>
    </Grid>
    <div>
      <Link to={'/research'}>
        <Button animated color='red'>
          <Button.Content visible>Return</Button.Content>
          <Button.Content hidden>
            Go Back To Previous Page
        </Button.Content>
        </Button>
      </Link>
    </div>
    {assetType !== 'crypto' && <div>
      <Button animated color='purple' onClick={revealFinancials}>
        <Button.Content visible>See Financials</Button.Content>
        <Button.Content hidden>
          Click Here
        </Button.Content>
      </Button>
    </div>}
    {assetType === 'crypto' && <div>
      <Button animated color='purple' onClick={revealMore}>
        <Button.Content visible>Learn More</Button.Content>
        <Button.Content hidden>
          Click Here
        </Button.Content>
      </Button>
    </div>}
    {assetType === 'crypto' && <Grid.Column style={showCrypto ? revealed : hidden}>
      <h4>Background</h4>
      <Container >{cryptoBackground}</Container>
      <h4>Technology</h4>
      <Container >{cryptoTechnology}</Container>
    </Grid.Column>}
    <Container style={showFinancials ? revealed : hidden}>
      <Grid >
        <Grid.Row >
          {financials.map((data, index) => {
            if (data[1] !== null && data[1] !== 0)
              return <><Grid.Column key={index} width={3} >
                < Table celled >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>{data[0]}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        {data[1]}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
              </>
          })}
        </Grid.Row>
      </Grid>
    </Container>
  </div >
}