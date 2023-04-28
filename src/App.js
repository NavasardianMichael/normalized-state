import { useEffect, useState } from 'react';
import NestedTable from './components/NestedTable';
import './App.css';
import {ProfilerChart} from './components/ProfilerChart';

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all')
      const data = await res.json()
      console.log({data});
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

  return (
    <div className='content p-3'>
      <div className="tables">
        <NestedTable list={list} setList={setList} />
      </div>
      <ProfilerChart list={list} />
    </div>
  );
}

export default App;
