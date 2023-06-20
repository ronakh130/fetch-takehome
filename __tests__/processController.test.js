const { addPoints, isReceipt } = require('../server/controllers/processController');

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

  const receipt2 = {
    retailer: 'M&M Corner Market',
    purchaseDate: '2022-03-20',
    purchaseTime: '14:33',
    items: [
      {
        shortDescription: 'Gatorade',
        price: '2.25',
      },
      {
        shortDescription: 'Gatorade',
        price: '2.25',
      },
      {
        shortDescription: 'Gatorade',
        price: '2.25',
      },
      {
        shortDescription: 'Gatorade',
        price: '2.25',
      },
    ],
    total: '9.00',
  };

  describe('addPoints', () => {
    it('correctly adds points', () => {
      expect(addPoints(receipt)).toBe(28);
    });

    it('correctly adds points to second receipt', () => {
      expect(addPoints(receipt2)).toBe(109);
    })
  });

  describe('isReceipt', () => {
    it('returns true with valid receipt', () => {
      expect(isReceipt(receipt)).toBe(true);
    });

    it('returns true with valid receipt', () => {
      expect(isReceipt({ ...receipt, total: 'hello' })).toBe(false);
    });
  });
});
