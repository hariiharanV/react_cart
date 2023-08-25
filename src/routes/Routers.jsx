import {BrowserRouter as Router, Routes, Route,useNavigate} from "react-router-dom"
import App from "../App"
import ShopList from "../components/ShopList"
import newItem from '../App'
import {useState,useEffect} from 'react'

function Routers() {

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

        return JSON.parse(prev_items)
  }
  )
 
const [wishItems,setWishItems] = useState(()=>{

  const wish_lst =  localStorage.getItem("WishList");

   if(wish_lst == null) return [];

   return JSON.parse(wish_lst)

})

const [deleteWished,setDeleteWished] = useState(()=>{

      const wished_items = JSON.parse(localStorage.getItem("WishList"));

      if(wished_items == null) return [];

    //   const itemlist = JSON.parse(localStorage.getItem("Items"))

    //  const filtered_items =  wished_items.filter((items)=>{
    //     return !items.itemName.includes(itemlist.itemName)
    //   })

      return wished_items;
})

const [checked,setChecked] = useState([])

useEffect(()=>{

  if(Array.isArray(newItem) && newItem.length>0)
  {
    const total = newItem.reduce((acc,item)=>acc+item.qty,0);

    setQtyTotal(total)
  }

  localStorage.setItem("Items",JSON.stringify(newItem))

  const checked_itms = newItem.filter((item)=>{
    return item.isChecked == true;
})

  setChecked(checked_itms)

},[newItem])


useEffect(()=>{

  if(checked.length === newItem.length)
    {
        const url = window.location.href;
        if(url.includes('shop'))
        {
          alert('Yasss! Shopping spree complete, fam! 🛍️🙌')
        }
    }

},[checked])

useEffect(()=>{
    console.log(previousItems)
    localStorage.setItem("PreviousItems",JSON.stringify(previousItems))
},[previousItems])

useEffect(()=>{

  console.log(deleteWished)

      localStorage.setItem("WishList",JSON.stringify(deleteWished))

},[deleteWished])


  return (
    <Routes>
        <Route path="/react_cart/" exact element={<App 
        searchString={searchString} setSearchString={setSearchString} 
        newItem={newItem} setNewItem={setNewItem} 
        previousItems={previousItems} setPreviousItems={setPreviousItems}
        itemName={itemName}  setItemName={setItemName}
        wishItems={wishItems} setWishItems={setWishItems}
        deleteWished={deleteWished}  setDeleteWished={setDeleteWished}
        qtyTotal={qtyTotal}  setQtyTotal={setQtyTotal}
        />}/> 
        <Route path="/react_cart/shop" exact element={<ShopList 

        newItem={searchString.length>0?
          newItem.filter((item)=> {return item.itemName.toLowerCase().includes(searchString.toLowerCase())}):
          newItem}
          searchString={searchString}
         setSearchString={setSearchString}
         setNewItem={setNewItem}
         qtyTotal={qtyTotal}/>}/>
    </Routes>
  )
}

export default Routers