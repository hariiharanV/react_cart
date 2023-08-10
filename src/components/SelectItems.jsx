import {useState,useEffect} from 'react'

function SelectItems({previousItems,setItemName,itemName,newItem,addItemHandler}) {

  const [temp,setTemp] = useState()

  const [filterItems,setFilterItems] = useState(()=>{

      const main_items = newItem.map((item)=>{return item.itemName})

     const filtered_items =  previousItems.filter((item)=>{
        return !main_items.includes(item)
      })

      return filtered_items;
  })

  const [fnlFilterItems,setFnlFilterItems] = useState([])

  useEffect(()=>{
    console.log("inside change")

    setFnlFilterItems((items)=>{
      return ["Previously added items",...filterItems]
    })

   // e.target.selectedIndex = 0;    
  },[filterItems])

  function getValue(e)
  {
    console.log(e.target.value)


    setTemp(e.target.value)

    setItemName(e.target.value)

    e.target.selectedIndex = 0;
  
  }

  useEffect(()=>{

    if(itemName != null && itemName != "Previously added items")
    {
      console.log(itemName)
      addItemHandler()
    }

  },[temp])

  // useEffect(()=>{



  // },[itemName])

  return (
    <div className="dropdown">
        <select className="dropdownList" name="items" id="items" onChange={(e)=>getValue(e)} >    
        {/* <option value="" disabled >Previously added items</option>  */}
        { fnlFilterItems && fnlFilterItems.map((item)=>{ 
                   
            return  <option key={item} value={item}>{item}</option>
        })}
        </select>
  </div>
  )
}

export default SelectItems