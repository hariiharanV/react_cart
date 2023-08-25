import {FaCaretLeft, FaCaretRight, FaTrash, FaHeart} from 'react-icons/fa'
import {useState} from 'react'


function ItemList({newItem,setNewItem,deleteWished,setDeleteWished}) {

  const [qty,setQty] = useState()

    function incrementHandler(id)
    {
  
      setNewItem((currItems)=>{
        return currItems.map((currItem)=>{
            if(currItem.id == id){
              return {...currItem, qty:parseInt(currItem.qty)+1};
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
              return {...currItem, qty:parseInt(currItem.qty)-1}
            }
            return currItem;
          })
        })
       
      }
    } 
  
    function deleteHandler(id)
    {

      const delete_item = newItem.find((item)=>item.id === id);

      setNewItem((currItems)=>{
        return currItems.filter((item)=>{
          return item.id != id;
        })
      })

      if(delete_item.wishListState === true)
      {
        console.log(true)

        const delete_items = deleteWished.filter((wished)=>{
          return wished.itemName.includes(delete_item.itemName)
        })

        if(delete_items.length == 0)
        {
          setDeleteWished((item)=>{
            return [...item, delete_item]
          })
        }
      }
    
    }

    function wishHandler(id)
    {
        setNewItem((currItem)=>{
          return currItem.map((item)=>{ 
              if(item.id == id)
              {
                return {...item,wishListState:!item.wishListState}
              }
              return item;
          })
        })
    }


    function getMeasure(e,id)
    {
      console.log(e.target.value)

      setNewItem((items)=>{
          return items.map((item)=>{
            if(item.id == id)
            {
              return {...item,measure:e.target.value}
            }
            return item;
          })
      })  

    }

    function inputQty(e,id)
    {
      console.log(e.target.value)

      setNewItem((items)=>{
        return items.map((item)=>{
            if(item.id==id)
            {
                return {...item,qty:parseInt(e.target.value)}
            }
            return item;
        })
      })
    }

    

  return (
    <div className="listBody">  
                {newItem.map((item)=>{
        
                 return <div className="item" key={item.id}>
                  <div className="content">
                    <h3 className="contentName">{item.itemName}</h3>
                    <FaHeart className={item.wishListState ? "heart_yes" : "heart_no"} onClick={()=>wishHandler(item.id)} size={20}/>
                    <FaTrash className="delete" onClick={()=>deleteHandler(item.id)} size={18}/>
                    </div>
                    <div className="numberSec">

                      <FaCaretLeft className="arrow" onClick={()=>decrementHandler(item.id)} size={55}/>

                      <input type="number" className="number" value={item.qty} onChange={(e)=>inputQty(e,item.id)}/>

                      <FaCaretRight className="arrow" onClick={()=>incrementHandler(item.id)} size={55}/>
                                     
                      <select className="measure" name="measure" id="measure" value={item.measure} onChange={(e)=>getMeasure(e,item.id)}> 
                          <option value="" >qty</option>  
                          <option value="L">L</option>
                          <option value="ml">ml</option>
                          <option value="kg">kg</option>
                          <option value="gm">gm</option>
                          <option value="m">m</option>
                          <option value="in">in</option>
                          <option value="ft">ft</option>
                          <option value="oz">oz</option>
                          <option value="lb">lb</option>
                      </select>
                    </div>
                  </div>

                  })} 
              </div>
  )
}

export default ItemList