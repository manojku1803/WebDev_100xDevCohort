import React, { useMemo, useState } from 'react'

function Assignment2() {
    const [items,setItems] = useState([
        { name: 'Chocolate', value:20},
        { name: 'Mango', value:120},
        { name: 'Onion', value:200},
        { name: 'Tamato', value:60},
    ])

    const totalvalue = useMemo(()=>{
        let value = 0;
        for(let i = 0; i < items.length; i++){
             value += items[i].value
        }
        return value
    },[items])
  return <div>
    <ul>
        {items.map((items, index)=> (
            <li key={index}>{items.name} - Price: ${items.value}</li>
        ))}
    </ul>
    <p>Total Value: {totalvalue}</p>
  </div>
}

export default Assignment2