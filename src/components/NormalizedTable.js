import { useEffect, useState } from 'react';
import { properties } from '../shared/constants';

function NormalizedTable({ list, setList, isActive }) {

  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    if(!isBlocked) return; 
    setIsBlocked(false)
  }, [isBlocked])

  if(!isActive) return null;

  const handleChange = (e) => {
    if(!isBlocked) setIsBlocked(true)
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

  if(!list.allIds) return null;

  return (
    <div className="normalized-table">
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
  );
}

export default NormalizedTable;
