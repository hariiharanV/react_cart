import { TiPlus } from 'react-icons/ti';
import {useState} from 'react'
import {nanoid} from 'nanoid';

function AddItem({setNewItem}) {

    const [itemName,setItemName] = useState()

    function itemHandler(newItem)
    {

        setItemName(newItem);
    }

    function addItemHandler()
    {
      if(itemName.length >=1)
      {
        console.log(itemName)
        setNewItem((currItem)=>{
          return [...currItem,{id:nanoid(),itemName:itemName,qty:1}]
        })
     }
  
      setItemName('')
    }
    
  return (
    <div className="addItem">
    <input type="text" className="inputText" value={itemName} onChange={(e)=>itemHandler(e.target.value)} placeholder="Add an item here..."></input>
    <TiPlus className="addIcon ml-2" onClick={addItemHandler} size={32} />
  </div>
  )
}

export default AddItem