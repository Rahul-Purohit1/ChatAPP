/*eslint-disable*/
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
 
const LineChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
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
      { date: '2024-05-01', value: 10 },
      { date: '2024-05-02', value: 20 },
      { date: '2024-05-03', value: 15 },
      { date: '2024-05-04', value: 25 },
      { date: '2024-05-05', value: 30 }
    ];
 
    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, width])
      .padding(0.1);
 
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([height, 0]);
 
    const line = d3.line<{ date: string; value: number }>()
      .x(d => x(d.date)! + x.bandwidth() / 2) // Adjust for center alignment
      .y(d => y(d.value)!);
 
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
 
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date)! + x.bandwidth() / 2) // Adjust for center alignment
      .attr("cy", (d) => y(d.value)!)
      .attr("r", 4)
      .attr("fill", "steelblue");
     
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
 
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));
  }, []);
 
  return <svg ref={svgRef}></svg>;
}
 
export default LineChart;