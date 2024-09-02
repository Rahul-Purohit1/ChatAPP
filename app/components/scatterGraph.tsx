/*eslint-disable*/
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
 
const ScatterPlot: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
 
  useEffect(() => {
    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
 
    // Static data for the scatter plot
    const data = [
      { x: 10, y: 20 },
      { x: 20, y: 30 },
      { x: 30, y: 40 },
      { x: 40, y: 50 },
      { x: 50, y: 60 },
    ];
 
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
 
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x) || 0])
      .range([margin.left, innerWidth]);
 
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) || 0])
      .range([innerHeight, margin.top]);
 
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
 
    svg.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);
 
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
 
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'steelblue');
  }, []);
 
  return <svg ref={svgRef}></svg>;
}
 
export default ScatterPlot;