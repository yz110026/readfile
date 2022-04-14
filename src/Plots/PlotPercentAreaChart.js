import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PlotPercentAreaChart = () => {
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

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const renderTooltipContent = ({payload,label}) => {
  if (payload) {
    const total = payload.reduce((result, entry) => result + entry.value, 0);
    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} (Total: ${total})`}</p>
        <ul className="list">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return payload, label
  }
};
  return (
    <main className='PlotRadialBarChart'>
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
       <AreaChart
         width={500}
         height={400}
         data={content}
         stackOffset="expand"
         margin={{
           top: 10,
           right: 30,
           left: 0,
           bottom: 0,
         }}
       >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey={xValue} />
         <YAxis tickFormatter={toPercent} />
         { xValue || yValue ?
           <Tooltip content={renderTooltipContent} /> : null
         }
         
         {yValue.map((y,index) => {
          return <Area type="monotone" dataKey={y} stackId="1" stroke={colorSets[index]} fill={colorSets[index]} />
         })}
         
       </AreaChart>
     </ResponsiveContainer>
      }
    </main>
  )
}

export default PlotPercentAreaChart;
