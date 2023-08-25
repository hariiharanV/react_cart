import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList'
import Total from './components/total';
import SelectItems from './components/SelectItems';
import {nanoid} from 'nanoid';
import WishListItems from './components/WishListItems';
import Routers from './routes/Routers';
import {BrowserRouter as Router, Routes, Route,useNavigate} from "react-router-dom"
import ShopList from './components/ShopList';


function App({searchString,setSearchString,previousItems,setPreviousItems,newItem,setNewItem,
qtyTotal,setQtyTotal, itemName,setItemName, wishItems, setWishItems, deleteWished, setDeleteWished}) {

  const navigate=useNavigate()

 function addItemHandler(val)
    {

       const found_item =  newItem && newItem.find((item)=>item.itemName.toLowerCase() == itemName.toLowerCase())

      console.log(found_item)

      if(itemName.length >=1 && found_item===undefined)
      {
        console.log(itemName)
        setNewItem((currItem)=>{
          return [...currItem,{id:nanoid(),itemName:itemName,qty:1,wishListState:val?true:false,isChecked:false,measure:""}]
        })

        const found_added_items = previousItems.find((item)=>item.toLowerCase() === itemName.toLowerCase())

        if(found_added_items===undefined)
        {
          setPreviousItems((currItems)=>{
            return [...currItems,itemName];
          })
        }
     }
     else if(val)
     {
        setNewItem((currItems)=>{
         return currItems.map((currItem)=>{
            if(currItem?.id == found_item?.id)
            {
              return {...currItem, wishListState:true}
            }
            return currItem
         })
        })

        console.log(newItem)
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
              itemName={itemName} addItemHandler={addItemHandler} newItem={newItem} 
              setNewItem={setNewItem}/>

              <WishListItems newItem={newItem} wishItems={wishItems} setNewItem={setNewItem} setWishItems={setWishItems} setItemName={setItemName} 
              deleteWished={deleteWished}    
              addItemHandler={addItemHandler} itemName={itemName}/>

              <AddItem setNewItem={setNewItem} newItem={newItem} previousItems={previousItems} 
              setPreviousItems={setPreviousItems} itemName={itemName} setItemName={setItemName} 
              addItemHandler={addItemHandler}/>

            {Array.isArray(newItem) && newItem.length>0 && <ItemList newItem={searchString.length>0?
            newItem.filter((item)=> {return item.itemName.toLowerCase().includes(searchString.toLowerCase())}):
            newItem
          } setNewItem={setNewItem} setWishItems={setWishItems} deleteWished = {deleteWished} setDeleteWished={setDeleteWished}/>}

            {Array.isArray(newItem) && newItem.length>0 && <Total newItem={newItem} qty={qtyTotal}  />}

            {newItem.length>0 && <div className="shop">
                      <button type="submit" className="shopBtn" onClick={()=>{navigate('/react_cart/shop')}}>shop </button> 
            </div>}

          </div>
      </div>
    </div>

  )
}

export default App
