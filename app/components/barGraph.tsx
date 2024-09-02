/*eslint-disable*/
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
 
const BarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  console.log("Bar Chart trying to render");
 
  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 450 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
 
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
 
    const data = [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
      { label: 'C', value: 15 },
      { label: 'D', value: 25 },
      { label: 'E', value: 30 }
    ];
 
    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.1);
 
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: { value: any; }) => d.value) || 0])
      .nice()
      .range([height, 0]);
 
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
 
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));
 
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: { label: string }) => x(d.label) || 0)
      .attr('y', (d: { value: d3.NumberValue }) => y(d.value) || 0)
      .attr('width', x.bandwidth())
      .attr('height', (d: { value: any; }) => height - (y(d.value) || 0))
      .attr('fill', 'steelblue');
  }, []);
 
  return <svg ref={svgRef}></svg>;
};
 
export default BarChart;