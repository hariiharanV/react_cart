import {FaCaretLeft, FaCaretRight, FaTrash, } from 'react-icons/fa'
import {useState, useEffect} from 'react'

function ItemList({newItem,setNewItem}) {

    function incrementHandler(id)
    {
  
      setNewItem((currItems)=>{
        return currItems.map((currItem)=>{
            if(currItem.id == id){
              return {...currItem, qty:currItem.qty+1};
            } 
  
            return currItem;
        })
      })
    }
  
    function decrementHandler(id)
    {
      const getItem = newItem.find((currItem)=>{
        return currItem.id == id;
      })
  
  
      console.log(getItem)
      if(getItem && getItem.qty>1)
      {
        console.log('inside if')
        
        setNewItem((currItems)=>{
          return currItems.map((currItem)=>{
            if(currItem.id == getItem.id)
            {
              return {...currItem, qty:currItem.qty-1}
            }
            return currItem;
          })
        })
       
      }
    } 
  
    function deleteHandler(id)
    {
  
      setNewItem((currItems)=>{
        return currItems.filter((item)=>{
          return item.id != id;
        })
      })
    }

    

  return (
    <div className="listBody">  
                {newItem.map((item)=>{
        
                 return <div className="item" key={item.id}>
                  <div className="content">
                    <h3 className="contentName">{item.itemName}</h3>
                    <FaTrash className="delete" onClick={()=>deleteHandler(item.id)} size={18}/>
                    </div>
                    <div className="numberSec">
                      <FaCaretLeft className="arrow" onClick={()=>decrementHandler(item.id)} size={55}/>
                      <input type="number" readOnly className="number" value={item.qty}/>
                      <FaCaretRight className="arrow" onClick={()=>incrementHandler(item.id)} size={55}/>
                    </div>
                  </div>

                  })} 
              </div>
  )
}

export default ItemList