import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList'
import Total from './components/total';
import SelectItems from './components/SelectItems';
import {nanoid} from 'nanoid';


function App() {

  const [newItem,setNewItem] = useState(()=>{

    const getItems = localStorage.getItem("Items")

    if(getItems== null) return []

    return JSON.parse(getItems)

  })

  const [qtyTotal,setQtyTotal] = useState()
  const [searchString,setSearchString] = useState('')
  const [itemName,setItemName] = useState()
  const [previousItems,setPreviousItems] = useState(()=>{

   const prev_items =  localStorage.getItem("PreviousItems")

   if(prev_items == null) return [];

  //  const items_wanted = JSON.parse(prev_items);

  //  //const newItem_list = newItem.length > 0  && newItem.map((item)=> item.itemName)

  // const newItem_list = JSON.parse(localStorage.getItem("Items"))

  // if(newItem_list!=null && newItem_list.length >0)
  // {
  //     console.log('inside if')

  //   const get_onlyNames = newItem_list.map((item)=> {return item.itemName})

  //   const select_items = items_wanted.filter((item)=>{
  //       return !get_onlyNames.includes(item);
  //     })
        
  //     console.log(select_items)
  //     return select_items;
  //   }
  

  //       return items_wanted;

        return JSON.parse(prev_items)
  }
  )

  useEffect(()=>{

    const total = newItem.reduce((acc,item)=>acc+item.qty,0);

    setQtyTotal(total)

    localStorage.setItem("Items",JSON.stringify(newItem))

   // console.log(newItem)

    // const itemNames = newItem.map((item)=> item.itemName )

    // console.log(itemNames)

    // setSelectItem(itemNames);

  },[newItem])

  useEffect(()=>{
      console.log(previousItems)
      localStorage.setItem("PreviousItems",JSON.stringify(previousItems))
  },[previousItems])

 // console.log(searchString)

 function getItemName(val)
 {
    console.log(val)
 }


 function addItemHandler()
    {

       const found_item =  newItem.find((item)=>item.itemName.toLowerCase() == itemName.toLowerCase())

    //  console.log(found_item)

      if(itemName.length >=1 && found_item===undefined)
      {
       // console.log(itemName)
        setNewItem((currItem)=>{
          return [...currItem,{id:nanoid(),itemName:itemName,qty:1}]
        })

        const found_added_items = previousItems.find((item)=>item.toLowerCase() === itemName.toLowerCase())

        if(found_added_items===undefined)
        {
          setPreviousItems((currItems)=>{
            return [...currItems,itemName];
          })
        }
     }
     setItemName('')
    }
  
  return (
    <div className="container">
      <div className="card">
          <div className="card-body">
            <div className="title">
              <h2>Cart <span>List</span></h2>
              <SearchBar searchHandler={setSearchString} />
            </div>

              <SelectItems previousItems={previousItems} setItemName={setItemName} 
              itemName={itemName} addItemHandler={addItemHandler} newItem={newItem}/>

              <AddItem setNewItem={setNewItem} newItem={newItem} previousItems={previousItems} 
              setPreviousItems={setPreviousItems} itemName={itemName} setItemName={setItemName} 
              addItemHandler={addItemHandler}/>

            {newItem.length>0 && <ItemList newItem={searchString.length>0?
            newItem.filter((item)=> {return item.itemName.toLowerCase().includes(searchString.toLowerCase())}):
            newItem
          } setNewItem={setNewItem} />}

            {newItem.length > 0 && <Total newItem={newItem} qty={qtyTotal}  />}
          </div>
      </div>
    </div>
  )
}

export default App
