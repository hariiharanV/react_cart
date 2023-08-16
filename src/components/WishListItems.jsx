import {useState,useEffect} from 'react'
import { FaList , FaTrash} from 'react-icons/fa'


function WishListItems({newItem,wishItems,setNewItem,setWishItems,deleteWished}) {


    const [temp,setTemp] = useState([])

useEffect(()=>{

        const wished_items = newItem.filter((item)=>{
            return item.wishListState === true;
        }) 
        
        console.log(newItem)
        console.log(deleteWished)

        setWishItems(wished_items)
     
},[newItem])


useEffect(()=>{

    console.log(wishItems)

    localStorage.setItem("WishList",JSON.stringify(wishItems));

},[wishItems])

useEffect(()=>{

    const wishedNames = wishItems.map((items)=>items.itemName);
    console.log('WIshedName =>'+wishedNames )

    if(!wishedNames.includes(deleteWished.itemName)){
        console.log(deleteWished)
        // setWishItems((items)=>{
        //     return [{...items,deleteWished}]
        // })

        setTemp((items)=>{
            return [...items,deleteWished]
        })
    }
    else if(wishedNames == null)
    {
        setTemp((items)=>{
            return [...items,deleteWished]
        })
    }

},[deleteWished])

useEffect(()=>{

    console.log(temp)

},[temp])


function deleteAll()
{
   setNewItem([])
}


  return (
        <div className="dropdown">
            <select className="dropdownList" name="items" id="items"  >    
            {/* <option value="" disabled >Previously added items</option>  */}
            { wishItems && wishItems.map((item)=>{ 
                       
                return  <option key={item.itemName} value={item.itemName}>{item.itemName}</option>
            })}
            </select>
            <button className="wishBtn" type="submit"> 💜 </button>
            <div className="deleteList">
                <button className="deleteAll" type="submit" onClick={deleteAll}>
                    <div className="dltIcon">
                        <FaList size={20}/>
                        <FaTrash size={20}/>
                    </div>
                </button>
            </div>
      </div>
      )
    }

export default WishListItems