import {FaSearch} from 'react-icons/fa'
import {useState} from 'react'

function SearchBar({searchHandler}) {

    // const [search,setSearch] = useState()

// function searchHandler(value)
// {  

//     setSearch(value)

//     console.log(search)

//     searchItem(search)
// }

  return (
    <div className="searchBar">
                <FaSearch size={20} style={{color:"white"}}/>
                <input className="searchText" onChange={(e)=>searchHandler(e.target.value)} placeholder="search items here..." type="text"/>
    </div>
  )
}

export default SearchBar