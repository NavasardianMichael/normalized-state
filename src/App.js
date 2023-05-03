import { useState } from 'react';

import NestedTable from './components/NestedTable';
import NormalizedTable from './components/NormalizedTable';
import { TABS } from './shared/constants';

import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState(TABS.nested)


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
      </header>
      <div className='content p-3'>
        <div className="tables">
          <NestedTable isActive={activeTab === TABS.nested} />
          <NormalizedTable isActive={activeTab === TABS.normalized} />
        </div>
      </div>
    </>
  );
}

export default App;
