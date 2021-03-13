import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Icon, Search, Grid, Image, Card, Table, Label } from 'semantic-ui-react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalGridLines } from 'react-vis'

export default function Asset({ location }) {
  const [financials, updateFinancials] = useState([])
  const [graphData, updateGraphData] = useState([])
  const [xyData, updateXYData] = useState([])
  const [xyDataParam, updateXYDataParam] = useState('')

  const asset = location.state.assetState
  useEffect(() => {
    async function tableData() {
      const { data } = await axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${asset}&metric=all&token=c13rrgf48v6r3f6kt4d0`)
      console.log(Object.entries(data.metric))
      updateFinancials(Object.entries(data.metric))
    }
    tableData()
  }, [])


  console.log('this is asset', asset)
  useEffect(() => {
    async function graphFunc() {
      const { data } = await axios.get(`http://api.marketstack.com/v1/eod?access_key=b423407c1ef7cdb1569a2f04fc263513&symbols=${asset}`)
      updateGraphData(data.data)
    }
    graphFunc()
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
    graphFunc1()
  }, [graphData])

  function graphEdit() {
    const newParams = xyData.slice(0, 7)
    updateXYData(newParams)
    updateXYDataParam(newParams.length)
  }
  if (!graphData) {
    return null
  }
  if (!financials) {
    return null
  }


  return <div>
    <h1>Asset Page</h1>
    <XYPlot height={300} width={300} xDomain={[Number(`${xyDataParam}`), 0]} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <LineSeries color="purple" data={xyData} />
    </XYPlot>

    <Button animated color='teal' onClick={graphEdit}>
      <Button.Content visible>1 Week</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
    <Button animated color='orange'>
      <Button.Content visible>1 Month</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
    <Button animated color='green'>
      <Button.Content visible>Total</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
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
    <Grid>
      <Grid.Row>
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
  </div >
}