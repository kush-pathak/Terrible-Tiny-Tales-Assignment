import React ,{ useState } from 'react';
import Papaparse from 'papaparse';
import './Home.css';
import * as d3 from 'd3';

const Home = () => {
    const [showButton, setShowButton] = useState(true);
    const [data, setData] = useState(null);
    const [histogramData, setHistogramData] = useState(null);
  
    const fetchData = async () => {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const text = await response.text();
      return text;
    }
  
    const handleExport = () => {
      const csvData = Papaparse.unparse(histogramData);
      const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "histogram.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    const handleSubmit = async () => {
      setShowButton(false);
      const text = await fetchData();
      const words = text.toLowerCase().split(/\W+/).filter(word => word !== '');
      const histogram = d3.rollup(words, v => v.length, d => d);
      const top20Words = Array.from(histogram.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 20);
      const data = top20Words.map(([word, frequency]) => ({ word, frequency }));
      setHistogramData(data);
    }
  
    return (
      <div className="App">
    {showButton && <button onClick={handleSubmit}>Submit</button>}
    {histogramData && (
      <div>
        <h2 style={{fontWeight: 'bolder', fontSize: 30, color: 'white' , contentAlign :'center'}}>Word Frequency Histogram</h2>
        <svg className="chart" width="100%" height="500">
          <g transform="translate(50, 50)">
            <g className="x-axis" />
            <g className="y-axis" />
            <g className="bars">
            {histogramData.map((d, i) => (
    <g key={i} transform={`translate(0, ${i * 20})`}>
      <text x={-10} y={10} alignmentBaseline="middle" fontWeight="bold">
        {i + 1}.
      </text>
      <rect x={20} y={0} width={d.frequency * 5} height={15} />
      <text x={d.frequency * 5 + 25} y={10} alignmentBaseline="middle">
        {d.word} ({d.frequency})
      </text>
    </g>
  ))}
            </g>
          </g>
        </svg>
        <button style={{ fontSize: '1.5rem', margin: '4px 4px' , padding : "auto"}} onClick={handleExport}>Export</button>
  
  
      </div>
    )}
  </div>
  
    );
  }
export default Home
