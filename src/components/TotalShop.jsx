import { useEffect, useState } from "react"

function TotalShop({newItem,qty}) {

    const [shopped,setShopped] = useState()
    const [remaining,setRemaining] = useState()


    useEffect(()=>{

        console.log('check')

        const checked_items =  newItem.filter((item)=>{
            return item.isChecked === true 
      })

      setShopped(checked_items.length)

      const unchecked_items =  newItem.filter((item)=>{
        return item.isChecked == false;
    })

    setRemaining(unchecked_items.length)

    if(unchecked_items.length == 0)
    {
        alert("Woohoo! All done with the shopping!")
    }

    },[newItem])

    return (
        <>
        <div className="total">
                       <h3 >{`Total (Items ${newItem.length})`} </h3>
                      <h5 >{`Qty ${qty}`}</h5>
        </div>

        <div className="totalShopped">
            <h3> {`Total Shopped `}<span className="shopped">{shopped}</span></h3>
            <h3 className="remain"> {`Remaining `}<span className="remaining">{remaining}</span></h3>
        </div>

        </>
      )
}

export default TotalShop