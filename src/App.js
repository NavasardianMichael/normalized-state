import { useState, Profiler } from 'react';
import NestedTable from './components/NestedTable';
import './App.css';
import {ProfilerChart} from './components/ProfilerChart';
import { NESTED_TABLE, NORMALIZED_STATE, TABS } from './shared/constants';
import NormalizedTable from './components/NormalizedTable';

const colors = {
  long: 'red',
  normal: 'orange',
  short: 'green'
}

const detectColorByValue = (duration) => {
  if(duration > 145) return colors.long
  if(duration > 135) return colors.normal
  return colors.short
}


function App() {
  const [list, setList] = useState(NESTED_TABLE)
  const [activeTab, setActiveTab] = useState(TABS.nested)
  const [chartData, setChartData] = useState([
      ["Element", "", { role: "style" }],
  ])

  const handleClick = (e) => {
    const data = e.currentTarget.name === TABS.nested ? NESTED_TABLE : NORMALIZED_STATE
    console.log(data)
    setList(data)
    setActiveTab(e.currentTarget.name)
  }


  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log(1)
    if(actualDuration === 0 || baseDuration === 0) return;
    const diff = commitTime - startTime
    console.log(2, diff)
    // if(diff > 3) return;
    if(phase === 'mount' || phase === 'nested-update') return;
    if(Array.isArray(list) ? !list.length : !list.allIds) return;
    console.log(3, diff)
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
    <Profiler id="profiler-chart" onRender={onRender}>
      <header>
        <button 
          name={TABS.nested} 
          onClick={handleClick} 
          className={activeTab === TABS.nested ? 'selected' : undefined}
        >
          {TABS.nested}
        </button>
        <button 
          name={TABS.normalized} 
          onClick={handleClick} 
          className={activeTab === TABS.normalized ? 'selected' : undefined}
        >
          {TABS.normalized}
        </button>
      </header>
      <div className='content p-3'>
        <div className="tables">
          <NestedTable list={list} setList={setList} isActive={activeTab === TABS.nested} />
          <NormalizedTable list={list} setList={setList} isActive={activeTab === TABS.normalized} />
        </div>
        <ProfilerChart chartData={chartData} />
      </div>
    </Profiler>
  );
}

export default App;
