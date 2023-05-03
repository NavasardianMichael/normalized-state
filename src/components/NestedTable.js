import { useEffect, useState } from 'react';
import { properties } from '../shared/constants';

function NestedTable({ list, setList, isActive }) {

  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    if(!isBlocked) return; 
    setIsBlocked(false)
  }, [isBlocked])

  if(!isActive) return null;

  const handleChange = (e) => {
    if(!isBlocked) setIsBlocked(true)
    const { title, value, name } = e.currentTarget
    setList(prev => prev.map(item => {
      if(item.name !== name) return item
      return {
        ...item,
        [title]: value
      }
    }))
    
  }

  return (
    <div className="nested-table">
      {isBlocked && <div className='blocked-layout'><h1>UI Blocked</h1></div>}
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
  );
}

export default NestedTable;
