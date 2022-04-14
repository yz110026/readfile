import React from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { useState, useEffect } from 'react';
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
  } from 'recharts';
const PlotScatterChart = () => {
    const { id } = useParams();
    const history = useHistory();
    const getFileById = useStoreState((state) => state.getFileById);
    const colorSets = useStoreState((state) => state.colorSets);
    const content = getFileById(id).content;
    const header = getFileById(id).headers;
    const [xValue, setXValue] = useState([]);
    const [yValue, setYValue] = useState([]);
    const [validX, setValidX] = useState([]);
    const [validY, setValidY] = useState([]);
    
    useEffect(() => {
      content.map((row,index)=>{
        if (index === 0) {
          Object.entries(row).map(([key,value],index) => {
            if (typeof value === "string") {
              
            } else if (typeof value === "number") {
              setValidY(validY => [...validY, header[index]])
              setValidX(validX => [...validX,header[index]]) 
            }
          })
        } 
      })
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
    <main className='PlotScatterChart'>
      <div className='card'>
        <div className="card-header">
          Please select X and Y value(s) to make a plot:
        </div>
        <div className='card-body' >
        <div className="btn-group" id="selectbox" role="group" aria-label="Basic radio toggle button group">
          <p>Valid X value:</p>
          {validX.map( x => {
            return (
              <div className="form-check" >
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                  value={x} onClick={(e) => handleClickRadio(e)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  {x}
                </label>
              </div>
            )
          })}
          
        </div>
        <div className='btn-group' id="selectbox">
          <p>Valid Y value:</p>
          {validY.map( y => {
            return (
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={y} id="flexCheckDefault"
                  onClick={(e) => handleClickCheckBox(e)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {y}
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
      {!content ? history.push('/') :
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
            width={500}
            height={400}
            data={content}
            margin={{
                top: 20,
                right: 80,
                bottom: 20,
                left: 20,
            }}
            >
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Legend />

            <XAxis dataKey={xValue} type="number" label={{ value: xValue, position: 'insideBottomRight', offset: 0 }} />
            <YAxis />
            {yValue.map((y,index) => {
                return(
                    <Scatter name={y} dataKey={y} fill={colorSets[index]} />
                )
            })}
            </ComposedChart>
        </ResponsiveContainer>
      }

    </main>
  )
}

export default PlotScatterChart
