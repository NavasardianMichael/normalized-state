import { Profiler, useEffect, useMemo, useState } from 'react';
import Chart from 'react-google-charts';

import { TABS, properties } from '../shared/constants';
import { detectColorByValue } from '../shared/functions';
import { usePrevious } from '../shared/hooks';

function NestedTable({ isActive, setRenderingAverageMs }) {

  const [list, setList] = useState([])
  const previousList = usePrevious(list)
  const [chartData, setChartData] = useState([
      ["Element", "", { role: "style" }],
  ])
  const renderingAverageMs = useMemo(() => {
    const [_, ...data] = chartData
    if(!data?.length) return 0;
    return data.reduce((acc, bar) => acc += bar[1], 0) / data.length
  }, [chartData])

  useEffect(() => {
    setRenderingAverageMs(prev => ({
      ...prev,
      [TABS.nested]: renderingAverageMs
    }))
  }, [renderingAverageMs])
 
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all')
      const data = await res.json()
      const processed = data.map(item => ({
        area: item.area,
        name: item.name.common,
        capital: item?.capital?.[0],
        region: item.region,
        population: item.population,
      }))
      setList(processed)
    }
    getData()
  }, [])

  if(!list.length) return null;
  
  const handleBlur = (e) => {
    // if(!isBlocked) setIsBlocked(true)
    const { title, value, name } = e.currentTarget
    setList(prev => prev.map(item => {
      if(item.name !== name) return item
      return {
        ...item,
        [title]: value
      }
    }))
    
  }

  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    if(previousList === list) return;
    if(actualDuration === 0 || baseDuration === 0) return;
    if(phase === 'mount' || phase === 'nested-update') return;
    setChartData(prev => ([
      ...prev,
      [
          "",
          actualDuration, 
          detectColorByValue(actualDuration)
      ]
    ]))
  }
  
  return (
    <div className='nested scenario'>
      <Profiler id="nested" onRender={onRender}>
        {
          isActive && (
            <div className="nested-table my-table">
              <table className='table'>
                <thead>
                  <tr>
                    {
                      properties.map(prop => {
                        return (
                          <th scope="col" key={prop}>{prop.toUpperCase()}</th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    list.map(item => {
                      return (
                        <tr key={item.name}>
                          {
                            properties.map(prop => {
                              return (
                                <td key={prop}>
                                  {
                                    prop === 'flag' ?
                                    <img src={item[prop]} /> :
                                    <input title={prop} name={item.name} onChange={handleBlur} value={item[prop]} />
                                  }
                                </td>
                              )
                            })
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </Profiler>
      <div className="chart">
        <h4>Nested scenario rendering dynamics</h4>
        <p>
          {`Rendered ${chartData.length - 1} times, lasted`} <b>{renderingAverageMs.toFixed(2)} ms</b> on average
        </p>
        <Chart chartType="ColumnChart" width="100%" height="35vh" data={chartData} />
      </div>
    </div>
  );
}

export default NestedTable;
