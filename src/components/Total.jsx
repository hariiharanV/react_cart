

function Total({newItem,qty}) {
  return (
    <div className="total">
                   <h3 className="totalName">{`Total (Items ${newItem.length})`} </h3>
                  <h5 className="qty">{`Qty ${qty}`}</h5>
              </div>
  )
}

export default Total