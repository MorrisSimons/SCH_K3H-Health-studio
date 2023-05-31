import React, { useEffect } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

const StyledChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`

function LineChart (props) {
  const { data, width, height } = props

  useEffect(() => {
    drawChart()
  }, [data])

  function drawChart () {
    d3.select('#container')
      .select('svg')
      .remove()
    d3.select('#container')
      .select('.tooltip')
      .remove()
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    const yMinValue = d3.min(data, d => d.value)
    const yMaxValue = d3.max(data, d => d.value)
    const xMinValue = d3.min(data, d => d.label)
    const xMaxValue = d3.max(data, d => d.label)

    const svg = d3
      .select('#container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width])
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, yMaxValue])
    const line = d3
      .line()
      .x(d => xScale(d.label))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX)
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickSize(15))
    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f6c3d0')
      .attr('stroke-width', 4)
      .attr('class', 'line')
      .attr('d', line)
  }
  return (
    <StyledChartContainer>
      <div id='container' />
    </StyledChartContainer>
  )
}

export default LineChart
