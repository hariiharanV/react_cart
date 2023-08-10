import { TiPlus } from 'react-icons/ti';
import {useState} from 'react'


function AddItem({setNewItem, newItem,previousItems,setPreviousItems,itemName,setItemName,addItemHandler}) {

    function itemHandler(newItem)
    {

        setItemName(newItem);
    }

    
  return (
    <div className="addItem">
    <input type="text" className="inputText" value={itemName} onChange={(e)=>itemHandler(e.target.value)} placeholder="Add an item here..."></input>
    <TiPlus className="addIcon ml-2" onClick={()=>{addItemHandler()}} size={32} />
  </div>
  )
}

export default AddItem