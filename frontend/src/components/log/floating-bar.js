import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const timeToLinear = (dateString) => {
  const time = dateString.slice(11).split(':')
  const mins = Math.floor((time[1] / 60) * 100)
  const seconds = Math.floor((time[2] / 60) * 100)
  return `${time[0]}.${mins}${seconds}`
}

const FloatingBarChart = ({ data }) => {
  const svgRef = useRef()

  // set up dimensions and margins
  const margin = { top: 20, right: 20, bottom: 50, left: 60 }
  const width = 600 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // create scales for x and y axes
    const xScale = d3
      .scaleLinear()
      .domain([0, 24]) // set x axis to 24 hours
      .range([0, width])
      .nice()

    const yScale = d3
      .scaleTime()
      .domain([d3.timeDay.offset(new Date(), -7), new Date()]) // set y axis to preceding 7 days
      .range([height, 0])

    // create x and y axes
    const xAxis = d3.axisBottom(xScale).ticks(24) // format hour labels on x axis

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(7)
      .tickFormat(d3.timeFormat('%a %d'))
      .tickSizeOuter(0) // remove outer ticks
      .tickPadding(10) // add padding between tick labels and axis line
      .tickSizeInner(-width)

    // render x and y axes
    svg
      .select('.x-axis')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(xAxis)

    svg
      .select('.y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis)
      .selectAll('.tick text, line')
      .attr('transform', `translate(0, -5)`)

    console.log(timeToLinear('2023-03-05T13:34:54'))
    // render floating bars for each data point
    svg
      .selectAll('.floating-bar')
      .data(data)
      .join('rect')
      .attr('class', 'floating-bar')
      .attr('x', (d) => xScale(timeToLinear(d.start)) + margin.left)
      .attr('y', (d) => yScale(d3.timeDay.floor(new Date(d.start))))
      .attr('height', height / 7.5)
      .attr('width', (d) => xScale(timeToLinear(d.end)) - xScale(timeToLinear(d.start)))
      .attr('fill', (d) => d.color)
      .append('title') // add title element to each rect element
      .text((d) => d.name) // set text content of title element
  }, [data])

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  )
}

export default FloatingBarChart
