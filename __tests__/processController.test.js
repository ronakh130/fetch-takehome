const { addPoints, isReceipt } = require("../server/controllers/processController");

describe('processController', () => {
  const receipt = {
    retailer: 'Target',
    purchaseDate: '2022-01-01',
    purchaseTime: '13:01',
    items: [
      {
        shortDescription: 'Mountain Dew 12PK',
        price: '6.49',
      },
      {
        shortDescription: 'Emils Cheese Pizza',
        price: '12.25',
      },
      {
        shortDescription: 'Knorr Creamy Chicken',
        price: '1.26',
      },
      {
        shortDescription: 'Doritos Nacho Cheese',
        price: '3.35',
      },
      {
        shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
        price: '12.00',
      },
    ],
    total: '35.35',
  };

  describe('addPoints', () => {
    it('correctly adds points', () => {
      expect(addPoints(receipt)).toBe(28)
    })
  })

  describe('isReceipt', () => {
    it('returns true with valid receipt', () => {
      expect(isReceipt(receipt)).toBe(true);
    });

    it('returns true with valid receipt', () => {
      expect(isReceipt({...receipt, total: 1})).toBe(false);
    });
  });
});
