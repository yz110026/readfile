import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
const PlotLineChart = () => {
    const { id } = useParams();
    const history = useHistory();
    const getFileById = useStoreState((state) => state.getFileById);
    const content = getFileById(id).content;
    const header = getFileById(id).headers;
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [xValue, setXValue] = useState([]);
    const [yValue, setYValue] = useState([]);
    
    
    useEffect(() => {
      setData(content);
      setHeaders(header);
    }, [content, header]);
   
    const handleClickRadio = (e) => {
      setXValue(e.target.value);
    }

    const handleClickCheckBox = (e) => {
      if (e.target.checked) {
        setYValue([...yValue, e.target.value]);
      } else {
        setYValue(yValue.filter(yValue => yValue !== e.target.value))
      }
    }
  return (
    <main className='PlotLineChart'>
      <div className='card'>
        <div className="card-header">
          Please select X and Y value(s) to make a plot:
        </div>
        <div className='card-body' >
        <div className="btn-group" id="selectbox" role="group" aria-label="Basic radio toggle button group">
          <p>X value:</p>
          {headers.map( header => {
            return (
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                  value={header} onClick={(e) => handleClickRadio(e)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  {header}
                </label>
              </div>
            )
          })}
          
        </div>
        <div className='btn-group' id="selectbox">
          <p>Y value:</p>
          {headers.map( header => {
            return (
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={header} id="flexCheckDefault"
                  onClick={(e) => handleClickCheckBox(e)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {header}
                </label>
              </div>
            )
          })}
        </div>
        </div>
        <div className="card-footer text-muted">
          {xValue.length && yValue.length ? `X value: ${xValue}, Y value(s): ${yValue}` : 'You should selet at lease one X value and one Y value'}
        </div>
      </div>
      {content ? 
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xValue} >
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend />
          {yValue.map((y) => {
            return (
            <Line type="monotone" dataKey={y} stroke="#8884d8" />
            )
          })}
        </LineChart>
      </ResponsiveContainer> : history.push('/')
    }
      
    </main>
  );
}

export default PlotLineChart;
