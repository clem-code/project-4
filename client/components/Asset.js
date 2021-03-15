import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Icon, Search, Grid, Image, Card, Table, Label, Container } from 'semantic-ui-react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalGridLines } from 'react-vis'

export default function Asset({ location }) {
  const [financials, updateFinancials] = useState([])
  const [cryptoDescription, updatecryptoDescription] = useState([])
  const [cryptoBackground, updatecryptoBackground] = useState([])
  const [cryptoTechnology, updatecryptoTechnology] = useState([])
  const [ratios, updateRatios] = useState([])
  const [showFinancials, updateShowFinancials] = useState(false)
  const [graphData, updateGraphData] = useState([])
  const [xyData, updateXYData] = useState([])
  const [xyDataParam, updateXYDataParam] = useState('')
  const [mktCap, updateMktCap] = useState('')
  console.log(location)
  const asset = location.state.assetState
  const assetName = location.state.nameState
  const quote = location.state.quoteState
  const assetType = location.state.assetType

  useEffect(() => {
    async function getMktCap() {
      const { data } = await axios.get(`https://financialmodelingprep.com/api/v3/market-capitalization/${asset}?apikey=8e17a4dcd9894ebe5fc45645972dffa7`)
      console.log(data[0].marketCap)
      updateMktCap(data[0].marketCap)
    }
    getMktCap()
  }, [])
  if (assetType === 'crypto') {
    useEffect(() => {
      async function getCryptoDescription() {
        const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${assetName}/profile`)
        console.log(' this should only appear if crupto', data.data.overview)
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
      console.log(Object.entries(data.metric))
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

  // useEffect(() => {
  //   async function balanceSheetData() {
  //     const { data } = await axios.get(`https://finnhub.io/api/v1/stock/financials-reported?symbol=${asset}&token=c13rrgf48v6r3f6kt4d0`)
  //     console.log('LOOK HERE', data.data[0].report.bs)
  //     console.log('LOOK HERE', data.data[0].report.cf)
  //     console.log('LOOK HERE', data.data[0].report.ic)
  //   }
  //   balanceSheetData()
  // }, [])

  useEffect(() => {

    async function graphFunc() {
      const { data } = await axios.get(`http://api.marketstack.com/v1/eod?access_key=b423407c1ef7cdb1569a2f04fc263513&symbols=${asset}`)
      updateGraphData(data.data)
    }
    async function cryptoGraphFunc() {
      const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${asset}/metrics/price/time-series?start=2021-01-01&interval=1d`)
      console.log('DFFGDDFFDGDGFGDFGDFGDF', data.data.values)
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
      console.log('look here please god', dataPointArray)
    }
    if (assetType !== 'crypto') {
      graphFunc1()
    } else {
      cryptoGraphFunc1()
    }
  }, [graphData])

  // function graphEdit() {
  //   const newParams = xyData.slice(0, 7)
  //   updateXYData(newParams)
  //   updateXYDataParam(newParams.length)
  // }

  function revealFinancials() {
    if (showFinancials) {
      updateShowFinancials(false)
    } else {
      updateShowFinancials(true)
    }
  }



  if (!graphData) {
    return null
  }
  if (!financials) {
    return null
  }

  const hidden = { overflow: 'auto', maxHeight: '500px', display: 'none' }
  const revealed = { overflow: 'auto', maxHeight: 300, display: 'inline-block' }


  return <div>
    <h1>{assetName}</h1>
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
          <h4>Background</h4>
          <Container style={revealed}>{cryptoBackground}</Container>
          <h4>Technology</h4>
          <Container style={revealed}>{cryptoTechnology}</Container>
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
    <div>

      <Button animated color='purple' onClick={revealFinancials}>
        <Button.Content visible>See Financials</Button.Content>
        <Button.Content hidden>
          Click Here
        </Button.Content>
      </Button>

    </div>
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