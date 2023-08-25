import {useState,useEffect} from 'react'
import { FaList , FaTrash} from 'react-icons/fa'
import {nanoid} from 'nanoid';


function WishListItems({newItem,itemName,setNewItem,setItemName,setWishItems,deleteWished,addItemHandler}) {

    const [temp,setTemp] = useState([])

    const [fnlDeleteItems,setFnlDeleteItems] = useState([])

useEffect(()=>{

        const wished_items = newItem.filter((item)=>{
            return item.wishListState === true;
        }) 
        
        // console.log(newItem)
        // console.log(deleteWished)

        const unwished_items = newItem.filter((item)=>{
            return item.wishListState == false;
        })

        // console.log(unwished_items)
        const wished_local = JSON.parse(localStorage.getItem("WishList"));

        // console.log(wished_local)

        const remove_items = unwished_items.filter((item)=>{
            return item.itemName.includes(wished_local?.itemName)
        })

        // console.log(remove_items)

        setWishItems(wished_items)
     
},[newItem])


useEffect(()=>{

    // console.log(deleteWished)


    setFnlDeleteItems((deleteItems)=>{
        return [{itemName:"WishList"},...deleteWished]
    })

},[deleteWished])

useEffect(()=>{

    if(itemName!= null && itemName != "WishList")
    {
        console.log('check')
        addItemHandler(1)
    }

},[temp])



function getValue(e)
{

    // console.log(e.target.value)   

    setTemp(e.target.value)

    setItemName(e.target.value)

    e.target.selectedIndex=0;
}

function deleteAll()
{

    console.log("inside delete all ")

   const wished_items = newItem.filter((item)=>{
    return item.wishListState == true;
   }) 

   const wishlst = JSON.parse(localStorage.getItem("WishList"));
   
   const wishlst_filtered = wished_items.filter((wishItms)=>{
    return !wishlst.some((wishItem)=>wishItem.itemName == wishItms.itemName)
   })

   console.log(wishlst_filtered)

   const fnl_filtered_wshd = wishlst.concat(wishlst_filtered)

   console.log(fnl_filtered_wshd)

   localStorage.setItem("WishList",JSON.stringify(fnl_filtered_wshd))

   setNewItem([])

   window.location.reload()
}

function deleteList()
{
    const result = window.confirm("You seriously wanna nuke the WishList💜? Just checking !!! ");
    if(result)
    {
        localStorage.removeItem("WishList");
        window.location.reload();
    }
}

function addItemsToList()
{
  const itemNames = JSON.parse(localStorage.getItem("Items")).map((item)=>item.itemName)

  const modified_items = JSON.parse(localStorage.getItem("WishList"));
  const filteredItems_toAdd = modified_items.filter((mod_itemName)=>{

    return !itemNames.includes(mod_itemName.itemName)

  })

//   console.log(filteredItems_toAdd)

  const array_list = newItem.concat(filteredItems_toAdd)

  setNewItem(array_list)

}


  return (
        <div className="dropdown2">
            <select className="dropdownList2" name="items" id="items"  onChange={(e)=>getValue(e)}>    
            {/* <option value="" disabled >Previously added items</option>  */}
            { fnlDeleteItems && fnlDeleteItems.map((item)=>{ 
                       
                return  <option key={item.itemName} value={item.itemName}>{item.itemName}</option>
            })}
            </select>
            <button className="wishBtn" type="submit" onClick={addItemsToList}> 💜 </button>
            <button className="wishDltBtn" type="submit" onClick={deleteList}> 💔 </button>
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