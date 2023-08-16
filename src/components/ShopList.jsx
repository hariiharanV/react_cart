import SearchBar from "./SearchBar"
import {useState, useEffect} from 'react'
import {FaHeart} from 'react-icons/fa'
import TotalShop from "./TotalShop"
import { useNavigate } from "react-router-dom"

function ShopList({newItem,setSearchString,searchString,setNewItem,qtyTotal}) {

    const navigate = useNavigate()


const [cartItems,setCartItems] = useState([])

useEffect(()=>{
    
setCartItems(searchString.length>0?
    newItem.filter((item)=> {return item.itemName.toLowerCase().includes(searchString.toLowerCase())}):
    newItem)

},[searchString,newItem])


function handleCheckboxChange(id)
{

    setNewItem((items)=>{
       return items.map((itm)=>{
            if(itm.id == id)
            {
                return {...itm,isChecked:!itm.isChecked}
            }
            return itm;
        })
    })

}


function gotoCart()
{
    navigate('/react_cart/')
}

  return (
    <div className="shop-container">
      <div className="card">
          <div className="card-body">
            <div className="title">
              <h2>Cart <span>List</span></h2>
              <SearchBar searchHandler={setSearchString} />

            </div>  
            <div className="gotoCart">
                <button className="gotoCartBtn" onClick={gotoCart} type="submit">Goto Cart</button>
             </div>
            <div className="cartBody">
            <div className="cart-header">
                <h3 className="header">Items</h3>
                <h3 className="header">Qty</h3>
            </div>
            {cartItems.map((item)=>{
                return (
                <div className="checkItem" key={item.id}> 
                    <div className="checkItemSec">
                    <input type="checkbox" checked={item.isChecked} 
                    onChange={()=>{handleCheckboxChange(item.id)}} className="checkbox"/>
                    <h3 className={item.isChecked ? "checkName" : "uncheckName"}>{item.itemName} </h3>
                    {item.wishListState && <FaHeart className="cartWishList" size={20}/>}
                    </div>
                    <div className="cartQty">
                        <h2 className="cartQty"> {item.qty}</h2>
                        <h3 className="cartMeasure"> {item.measure}</h3>
                    </div>
                </div>
                )
            })}

            </div>
            <TotalShop newItem={newItem} qty={qtyTotal} />       
          </div>
      </div>
    </div>
  )
}

export default ShopList