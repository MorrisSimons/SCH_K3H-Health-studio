import React, { useState, useEffect } from 'react'
import LineChart from './LineChart'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

function Analysis () {
  const [data, setData] = useState([])

  useEffect(() => {
    regenerateData()
  }, [])

  function regenerateData () {
    const chartData = []
    for (let i = 0; i < 20; i++) {
      const value = Math.floor(Math.random() * i + 3)
      chartData.push({
        label: i,
        value,
        tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`
      })
    }
    setData(chartData)
  }

  return (
    <styledAnalysis>
      <Header />
      <ButtonContainer>
        <button onClick={regenerateData}>Change Data</button>
        <button>Export Data</button>
      </ButtonContainer>
      <Button>
        <button>Antal Personer</button>
      </Button>
      <LineChart data={data} width={400} height={300} />
      <Footer />
    </styledAnalysis>

  )
}

export default Analysis

const styledAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

`

const ButtonContainer = styled.div`
  padding-top: 90px;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  
`

const Button = styled.button`
  margin-left: 10px;
  margin-left: auto;
`
