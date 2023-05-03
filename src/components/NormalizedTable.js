import { Profiler, useState } from 'react';
import Chart from 'react-google-charts';

import { NORMALIZED_STATE, properties } from '../shared/constants';
import { detectColorByValue } from '../shared/functions';

function NormalizedTable({ isActive }) {

  const [list, setList] = useState(NORMALIZED_STATE)
  // const [isBlocked, setIsBlocked] = useState(false)
  const [chartData, setChartData] = useState([
    ["Element", "", { role: "style" }],
  ])

  // useEffect(() => {
  //   if(!isBlocked) return; 
  //   setIsBlocked(false)
  // }, [isBlocked])

  if(!isActive | !list.allIds.length) return null;

  const handleChange = (e) => {
    // if(!isBlocked) setIsBlocked(true)
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
    <div className='normalized scenario'>
      <Profiler id="normalized-chart" onRender={onRender}>
        <div className="normalized-table table">
          <p>NORMALIZED</p>
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
      </Profiler>
      <div className="chart">
        <Chart chartType="ColumnChart" width="50%" height="80vh" data={chartData} />
      </div>
    </div>
  );
}

export default NormalizedTable;
