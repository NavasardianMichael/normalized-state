import { Profiler, useEffect, useMemo, useState } from 'react';
import Chart from 'react-google-charts';

import { TABS, properties } from '../shared/constants';
import { detectColorByValue } from '../shared/functions';
import { usePrevious } from '../shared/hooks';

function NormalizedTable({ isActive, setRenderingAverageMs }) {

  const [list, setList] = useState({
    byId: {},
    allIds: []
  })
  const previousList = usePrevious(list)
  const [chartData, setChartData] = useState([
    ["Element", "", { role: "style" }],
  ])
  const renderingAverageMs = useMemo(() => {
    const [_, ...data] = chartData
    console.log({chartData});
    if(!data?.length) return 0;
    return data.reduce((acc, bar) => acc += +bar[1], 0)
  }, [chartData])

  useEffect(() => {
    setRenderingAverageMs(prev => ({
      ...prev,
      [TABS.normalized]: renderingAverageMs
    }))
  }, [renderingAverageMs])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all')
      const data = await res.json()
      let processed = {
        byId: {},
        allIds: []
      }
        data.forEach(item => {
            processed.byId[item.name.common] = {
                area: item.area,
                name: item.name.common,
                capital: item?.capital?.[0],
                region: item.region,
                population: item.population,
            }
        processed.allIds.push(item.name.common)
      })
      
      setList(processed)
    }
    getData()
  }, [])

  if(!list.allIds.length) return null;

  const handleChange = (e) => {
    const { title, value, name } = e.currentTarget
    setList(prev => ({
        ...prev,
        byId: {
            ...prev.byId,
            [name]: {
                ...prev.byId[name],
                [title]: value
            }
        }
    })) 
  }


  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    if(previousList === list) return;
    if(actualDuration === 0 || baseDuration === 0) return;
    if(phase === 'mount') return;
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
    <div className='normalized scenario'>
      <Profiler id="normalized-chart" onRender={onRender}>
        {
            isActive && (
              <div className="normalized-table my-table">
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
                      list.allIds.map(id => {
                          const item = list.byId[id]
                              return (
                                  <tr key={id}>
                                  {
                                      properties.map(prop => {
                                      return (
                                          <td key={prop}>
                                          {
                                              prop === 'flag' ?
                                              <img src={item[prop]} /> :
                                              <input title={prop} name={item.name} onChange={handleChange} value={item[prop]} />
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
        <h4>Normalized data chart</h4>
        <p>{`Rendered ${chartData.length - 1} times, lasted`} <b>{renderingAverageMs.toFixed(2)} ms</b></p>
        <Chart chartType="ColumnChart" width="100%" height="40vh" data={chartData} />
      </div>
    </div>
  );
}

export default NormalizedTable;
