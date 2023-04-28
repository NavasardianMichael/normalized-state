import { properties } from '../shared/constants';

function NestedTable({ list, setList }) {

  const handleChange = (e) => {
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
