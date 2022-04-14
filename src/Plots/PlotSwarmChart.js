import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { useState, useEffect } from 'react';
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'

const PlotSwarmChart = () => {
    const { id } = useParams();
    const history = useHistory();
    const getFileById = useStoreState((state) => state.getFileById);
    const colorSets = useStoreState((state) => state.colorSets);
    const content = getFileById(id).content;
    const header = getFileById(id).headers;
    const [xValue, setXValue] = useState([]);
    const [yValue, setYValue] = useState('');
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
        setYValue(e.target.value);
      } else {
        setYValue(yValue.filter(yValue => yValue !== e.target.value))
      }
    }
    return(
        <main className='PlotLineChart'>
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
        {content ?  
            <ResponsiveSwarmPlot
            data={content}
            groups={["Iris-setosa","Iris-versicolor"]}
            identity="id"
            value="number"
            valueFormat="$.2f"
            valueScale={{ type: 'linear', min: 0, max: 500, reverse: false }}
            
            size={{
                key: '_sepal_width',
                values: [
                    4,
                    20
                ],
                sizes: [
                    6,
                    20
                ]
            }}
            forceStrength={4}
            simulationIterations={100}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.6
                    ],
                    [
                        'opacity',
                        0.5
                    ]
                ]
            }}
            margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
            axisTop={{
                orient: 'top',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'group if vertical, price if horizontal',
                legendPosition: 'middle',
                legendOffset: -46
            }}
            axisRight={{
                orient: 'right',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'price if vertical, group if horizontal',
                legendPosition: 'middle',
                legendOffset: 76
            }}
            axisBottom={{
                orient: 'bottom',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'group if vertical, price if horizontal',
                legendPosition: 'middle',
                legendOffset: 46
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'price if vertical, group if horizontal',
                legendPosition: 'middle',
                legendOffset: -76
            }}
        /> : history.push('/') 
        }

        </main>
    );
}

export default PlotSwarmChart;
