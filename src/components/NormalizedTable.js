import { useEffect, useState } from 'react';
import { properties } from '../shared/constants';
import afterFrame from 'afterframe';
import { measureInteraction } from '../App';

function NormalizedTable({ list, setList, isActive }) {


//   useEffect(() => {
//     // console.log('useEffect');
//   }, [list])

//   useEffect(() => {
//     if(!isBlocked) return; 
//     setIsBlocked(false)
//   }, [isBlocked])

  if(!isActive) return null;

  const handleChange = (e) => {
    const interaction = measureInteraction();
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

    afterFrame(() => {
      interaction.end();
    });
  }

  if(!list.allIds) return null;

  return (
    <div className="normalized-table">
        <p>NORMALIZED</p>
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
