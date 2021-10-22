const calculateTotals = (values) => {
  let subtotal = 0
  let taxTotal = 0
  let taxRate = 0
  let tipRate = 0
  let preTipTotal = parseInt(values.price)
  let tip = parseInt(values.tip)
  let total = preTipTotal + tip
  let splits = {}

  // calculate subtotal
  values.plates.forEach(({price}) => subtotal += parseInt(price))

  // calculate tax total
  taxTotal = preTipTotal - subtotal

  // calculate tax rate
  taxRate = taxTotal / subtotal

  // calculate tip percentage
  tipRate = tip / preTipTotal

  // plate map
  values.people.forEach(({name}) => {
    splits[name] = { total: 0, tax: 0, tip: 0, ledger: [] }
  })
	
  Object.keys(splits).forEach((person) => {
    values.plates.forEach((plate) => {
      if (plate.eatenBy.includes(person)) {
        const splitAmount = plate.eatenBy.length
        const plateCost = parseInt(plate.price) / splitAmount
        const taxCost = plateCost * taxRate
        const tipCost = (taxCost + plateCost) * tipRate
        const plateTotal = plateCost + tipCost + taxCost
        splits[person].ledger.push({
          name: plate.name,
          plateCost,
          plateTotal,
          tipCost,
          taxCost
        })
        splits[person].total += plateTotal
        splits[person].tip += tipCost
        splits[person].tax += taxCost
      }
    })
  })
  return { 
    subtotal, 
    taxRate, 
    tipRate,
    taxTotal, 
    preTipTotal, 
    tip,
    total,
    splits
  }
}
export default calculateTotals
