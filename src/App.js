import { useMemo, useState } from 'react';

import NestedTable from './components/NestedTable';
import NormalizedTable from './components/NormalizedTable';
import { TABS } from './shared/constants';

import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState(TABS.nested)
  const [renderingAverageMs, setRenderingAverageMs] = useState({
    [TABS.nested]: 0,
    [TABS.normalized]: 0
  })

  const ratio = useMemo(() => {
    const result = renderingAverageMs[TABS.nested] / renderingAverageMs[TABS.normalized] - 1
    if(!result) return 'N/A'
    return (result * 100).toFixed(2)
  }, [renderingAverageMs])

  const handleClick = (e) => {
    setActiveTab(e.currentTarget.name)
  }

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
        <p className='summary'>
          In the normalized state scenario the rendering "actualDuration" is <b>{(ratio && isFinite(ratio)) ? ratio : 'N/A'}%</b> faster,
          than in the nested state scenario
        </p>
      </header>
      <div className='content p-3'>
        <div className="tables">
          <NestedTable 
            isActive={activeTab === TABS.nested}
            setRenderingAverageMs={setRenderingAverageMs}
          />
          <NormalizedTable 
            isActive={activeTab === TABS.normalized}
            setRenderingAverageMs={setRenderingAverageMs}
          />
        </div>
      </div>
    </>
  );
}

export default App;
