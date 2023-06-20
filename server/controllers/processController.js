const req = require('express/lib/request');
const { v4: uuidv4 } = require('uuid');

const processController = {
  calculatePoints(req, res, next){
    const {receipt} = req.body;
    const {ids, allReceipts} = req.app.locals;

    if(!isReceipt(receipt)){
      return next({
        log: 'ERROR: Please enter a valid receipt',
        message: { err: 'Error occurred in processController.calculatePoints. Check server logs for more details.' },
      });
    }

    if(!allReceipts.get(receipt)){
      const id = uuidv4();
      ids[id] = addPoints(receipt);
      allReceipts.set(receipt, id);
    }
    
    res.locals.data = allReceipts.get(receipt);
    return next();
  }
};

function addPoints(receipt){
  const {retailer, total, purchaseDate, purchaseTime, items} = receipt;
  let points = 0;
  
  // One point for every alphanumeric character in the retailer name.
  for(const char of retailer){
    if (char.match(/^[0-9a-z]+$/i)) points++;
  }

  // 50 points if the total is a round dollar amount with no cents.
  if(total.slice(-2) === '00') points += 50;

  // 25 points if the total is a multiple of 0.25.
  if(parseFloat(total) % 0.25 === 0) points += 25;

  // 5 points for every two items on the receipt.
  points += Math.floor(items.length / 2) * 5;

  // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  for(const item of items){
    const desc = item.shortDescription.trim();
    if(desc.length % 3 === 0) points += Math.ceil(parseFloat(item.price) * 0.2);
  }
  
  // 6 points if the day in the purchase date is odd.
  if(parseInt(purchaseDate.slice(-2)) % 2 !== 0) points += 6;
  
  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  const hour = parseInt(purchaseTime.slice(2));
  if(hour >= 14 && hour < 16) points += 10;

  return points;
}

function isReceipt(receipt){
  if (
    typeof receipt.retailer === 'string' &&
    typeof receipt.purchaseDate === 'string' &&
    typeof receipt.purchaseTime === 'string' &&
    Array.isArray(receipt.items) &&
    receipt.items.every((item) => typeof item.shortDescription === 'string' && typeof item.price === 'string') &&
    typeof receipt.total === 'string'
  ) {
    return true;
  }
  return false;
}

module.exports = {processController, addPoints, isReceipt};
