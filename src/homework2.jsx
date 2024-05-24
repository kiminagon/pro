class Chart extends React.Component {
    render() {
      const { data } = this.props
      
      const topMargin = 100;
      const leftMargin = 100;
      const rightMargin = 300;
      const bottomMargin = 10;
      const contentWidth = 800;
      const contentHeight = 50 * data.length
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      
      const width = leftMargin + contentWidth + rightMargin;
      const height = topMargin + contentHeight + bottomMargin;
      
      const sepalLengths = data.map(item => item.sepalLength);
      const maxSepalLength = Math.max(...sepalLengths);
      
      const xScale = d3.scaleLinear()
      .domain([0, maxSepalLength])
      .range([0, contentWidth])
      .nice();
      
      const sepalWidths = data.map(item => item.sepalWidth);
      const yScale = d3.scaleBand()
      .domain(sepalWidths)
      .range([0, contentHeight])
      .padding(0.10);
  
      
      return (
        <svg width={width} height={height}>
          <g transform={`translate(${leftMargin},${topMargin})`}>
            {data.map((d, i) => (
              <circle
                key={i}
                cx={xScale(d.sepalLength)}
                cy={yScale(d.sepalWidth)}
                r={5}
                fill={color(i)}
              />
            ))}
          </g>
        </svg>
      );
    }
  }
  
  fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json")
    .then(response => response.json())
    .then(data => {
      ReactDOM.render(<Chart data={data} />, document.getElementById("root"))
    })