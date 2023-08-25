import {useState,useEffect} from 'react'
import {nanoid} from 'nanoid';

function SelectItems({previousItems,setItemName,itemName,setNewItem,newItem,addItemHandler}) {

  const [temp,setTemp] = useState([])

  const [filterItems,setFilterItems] = useState(()=>{

      const main_items = newItem.map((item)=>{return item.itemName})

     const filtered_items =  previousItems.filter((item)=>{
        return !main_items.includes(item)
      })

      return filtered_items;
  })

  const [fnlFilterItems,setFnlFilterItems] = useState([])

  useEffect(()=>{

    if(itemName != null && itemName != "Previously added items")
    {
      console.log(itemName)
      addItemHandler()
    }

  },[temp])


  useEffect(()=>{
    console.log("inside change")

    setFnlFilterItems((items)=>{
      return ["Previously added items",...filterItems]
    })  
  },[filterItems])


  function getValue(e)
  {
    console.log(e.target.value)

    setTemp(e.target.value)

    setItemName(e.target.value)

    e.target.selectedIndex = 0;
  
  }

  function addItemsToList()
  {
    const itemNames = JSON.parse(localStorage.getItem("Items")).map((item)=>item.itemName)

    const modified_items = JSON.parse(localStorage.getItem("PreviousItems")).map((tmp)=>({id:nanoid(),itemName:tmp,qty:1,wishListState:false,isChecked:false,measure:""}));

    const filteredItems_toAdd = modified_items.filter((mod_itemName)=>{

      return !itemNames.includes(mod_itemName.itemName)

    })

    console.log(filteredItems_toAdd)

    const array_list = newItem.concat(filteredItems_toAdd)

    setNewItem(array_list)

  }

  function addAllHandler()
  {
    console.log('click')

    const fetch_items = JSON.parse(localStorage.getItem("PreviousItems"));

    addItemsToList()

    window.location.reload();

  }

  return (
    <div className="dropdown">
        <select className="dropdownList" name="items" id="items" onChange={(e)=>getValue(e)} >    
        {/* <option value="" disabled >Previously added items</option>  */}
        { fnlFilterItems && fnlFilterItems.map((item)=>{ 
                   
            return  <option key={item} value={item}>{item}</option>
        })}
        </select>
        <button className="addBtn" onClick={addAllHandler} type="submit"> 🛒 </button>
  </div>
  )
}

export default SelectItems