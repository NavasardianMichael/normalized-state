import { useState, Profiler } from 'react';
import NestedTable from './components/NestedTable';
import './App.css';
import {ProfilerChart} from './components/ProfilerChart';
import { NESTED_TABLE, NORMALIZED_STATE, TABS } from './shared/constants';
import NormalizedTable from './components/NormalizedTable';

export function measureInteraction(interactionName) {
  // Don’t do this
  performance.mark(interactionName + ' start');

  return {
    end() {
      performance.mark(interactionName + ' end');
      const measure = performance.measure(
        interactionName + ' duration',
        interactionName + ' start',
        interactionName + ' end',
      );
      console.log('The interaction took', measure.duration, 'ms');
    },
  };
}

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

  const setChart = (value) => {
    setChartData(prev => ([
          ...prev,
          [
              "",
              value, 
              detectColorByValue(value)
          ]
      ]))    
  }


  // function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  //   console.log(1)
  //   if(actualDuration === 0 || baseDuration === 0) return;
  //   const diff = commitTime - startTime
  //   console.log(2, diff)
  //   // if(diff > 3) return;
  //   if(phase === 'mount' || phase === 'nested-update') return;
  //   if(Array.isArray(list) ? !list.length : !list.allIds) return;
  //   console.log(3, diff)
  //   setChartData(prev => ([
  //         ...prev,
  //         [
  //             "",
  //             actualDuration, 
  //             detectColorByValue(actualDuration)
  //         ]
  //     ]))
  // }
  return (
    <>
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
          <NestedTable setChartData={setChart} list={list} setList={setList} isActive={activeTab === TABS.nested} />
          <NormalizedTable setChartData={setChart} list={list} setList={setList} isActive={activeTab === TABS.normalized} />
        </div>
        <ProfilerChart chartData={chartData} />
      </div>
    </>
  );
}

export default App;
