import { Profiler, useState } from 'react';
import Chart from 'react-google-charts';

import { NESTED_TABLE, properties } from '../shared/constants';
import { detectColorByValue } from '../shared/functions';

function NestedTable({ isActive }) {

  const [list, setList] = useState(NESTED_TABLE)
  // const [isBlocked, setIsBlocked] = useState(false)
  const [chartData, setChartData] = useState([
      ["Element", "", { role: "style" }],
  ])

  // useEffect(() => {
  //   if(!isBlocked) return; 
  //   setIsBlocked(false)
  // }, [isBlocked])

  if(!isActive | !list.length) return null;

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
        <div className="nested-table table">
          {/* {isBlocked && <div className='blocked-layout'><h1>UI Blocked</h1></div>} */}
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
      </Profiler>
      <div className="chart">
        <Chart chartType="ColumnChart" width="50%" height="80vh" data={chartData} />
      </div>
    </div>
  );
}

export default NestedTable;
