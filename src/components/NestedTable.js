import { useEffect, useState } from 'react';
import { properties } from '../shared/constants';
import afterFrame from "afterframe";
import { measureInteraction } from '../App';

function NestedTable({ list, setList, isActive }) {

  if(!isActive) return null;

  const handleChange = (e) => {
    const interaction = measureInteraction();
    const { title, value, name } = e.currentTarget
    setList(prev => prev.map(item => {
      if(item.name !== name) return item
      return {
        ...item,
        [title]: value
      }
    }))

    afterFrame(() => {
      interaction.end();
    });
    
  }

  return (
    <div className="nested-table">
      {/* {isBlocked && <div className='blocked-layout'><h1>UI Blocked</h1></div>} */}
      <p>NESTED</p>
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
