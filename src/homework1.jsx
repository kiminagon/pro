class Chart extends React.Component {
    render () {
      const { data } = this.props
      
      const topMargin = 100;
      const leftMargin = 100;
      const rightMargin = 300;
      const bottomMargin = 10;
      const contentWidth = 800;
      const contentHeight = 50 * data.series.length * data.labels.length;
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      
      const width = leftMargin + contentWidth + rightMargin;
      const height = topMargin + contentHeight + bottomMargin;
      
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data.series.flatMap((s) => s.values))])
        .range([0, contentWidth])
        .nice();
      
      const yScale = d3.scaleBand()
        .domain(data.labels)
        .range([0, contentHeight])
        .padding(0.10);
      
      return (
        <svg width={width} height={height}>
          <g transform={`translate(${leftMargin},${topMargin})`}>
            {data.labels.map((label, i) => (
              <g key={label} transform={`translate(0, ${yScale(label)})`}>
                {data.series.map((series, j) => (
                  <rect
                    key={series.name}
                    x={0}
                    y={j * (yScale.bandwidth() / data.series.length)}
                    width={xScale(series.values[i])}
                    height={(yScale.bandwidth() / data.series.length) - 20}
                    fill={color(series.name)}
                  />
                ))}
                <text x={-25} y={(yScale.bandwidth() / 2.1)}>
                  {label}
                </text>
                <line
                  x1={-10}
                  y1={(yScale.bandwidth() / 2.3)}
                  x2={0}
                  y2={(yScale.bandwidth() / 2.3)}
                  stroke="black"
                />
              </g>
            ))}
            <g>
              {xScale.ticks().map((tick) => (
                <g key={tick} transform={`translate(${xScale(tick)},0)`}>
                  <line y1={0} y2={contentHeight - 5} stroke="black" />
                  <text x={(xScale(tick) / width)} y={contentHeight + 10} textAnchor="middle">
                    {tick}
                  </text>
                </g>
              ))}
            </g>
            <line
              x1={0}
              y1={contentHeight - 10}
              x2={contentWidth + 80}
              y2={contentHeight - 10}
              stroke="black"
            />
            <g transform={`translate(${contentWidth + 15},10)`}>
              {data.series.map((series, i) => (
                <g key={series.name} transform={`translate(0, ${i * 30})`}>
                  <rect width={20} height={20} fill={color(series.name)} />
                  <text x={25} y={15}>
                    {series.name}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </svg>
      ); 
    }
  }
  
  class App extends React.Component {
    render () {
      const data = {
    labels: ['A', 'B', 'C', 'D'],
    series: [
      {
        name: 'data',
        values: [123, 456, 789, 1111]
      },
      {
        name: 'another data',
        values: [234, 567, 891, 1024]
      },
      {
        name: 'and more',
        values: [567, 678, 789, 890]
      }
    ]
  }
      return <Chart data={data} />
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))