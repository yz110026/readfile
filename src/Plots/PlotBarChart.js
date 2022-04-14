import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlotBarChart = () => {
    const { id } = useParams();
    const history = useHistory();
    const getFileById = useStoreState((state) => state.getFileById);
    const content = getFileById(id).content;
    const header = getFileById(id).headers;
    const [xValue, setXValue] = useState([]);
    const [yValue, setYValue] = useState([]);
    const colorSets = useStoreState((state) => state.colorSets);
    const [validX, setValidX] = useState([]);
    const [validY, setValidY] = useState([]);

    useEffect(() => {
      content.map((row,index)=>{
        if (index === 0) {
          Object.entries(row).map(([key,value],index) => {
            if (typeof value === "string") {
              console.log(validX)
              return setValidX(validX => [...validX,header[index]])
            } else if (typeof value === "number") {
              return setValidY(validY => [...validY, header[index]]);
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
    <main className='PlotBarChart'>
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
      { !content ? history.push('/') : 
       <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={content}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xValue} />
        <YAxis />
        <Tooltip />
        <Legend />
        {yValue.map((y,index) => {
          return <Bar dataKey={y}  fill={colorSets[index]} />
        })}
        </BarChart>
       </ResponsiveContainer>
      }
    </main>
  )
}

export default PlotBarChart;
