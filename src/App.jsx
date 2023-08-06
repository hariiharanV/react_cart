import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList'
import Total from './components/total';


function App() {

  const [newItem,setNewItem] = useState(()=>{

    const getItems = localStorage.getItem("Items")

    if(getItems== null) return []

    return JSON.parse(getItems)

  })

  const [qtyTotal,setQtyTotal] = useState()
  const [searchString,setSearchString] = useState('')

  useEffect(()=>{

    const total = newItem.reduce((acc,item)=>acc+item.qty,0);

    setQtyTotal(total)

    localStorage.setItem("Items",JSON.stringify(newItem))

  },[newItem])

  console.log(searchString)
  
  return (
    <div className="container">
      <div className="card">
          <div className="card-body">
            <div className="title">
              <h2>Cart <span>List</span></h2>
              <SearchBar searchHandler={setSearchString} />
            </div>
              <AddItem setNewItem={setNewItem}/>

            {newItem.length>0 && <ItemList newItem={searchString.length>0?
            newItem.filter((item)=> {return item.itemName.toLowerCase().includes(searchString.toLowerCase())}):
            newItem
          } setNewItem={setNewItem} />}

            {newItem.length > 0 && <Total newItem={newItem} qty={qtyTotal}/>}
          </div>
      </div>
    </div>
  )
}

export default App
