const request = require('supertest');
const server = 'http://localhost:3000';

let uuid;

describe('/receipts/process', () => {
  const receipt = {
    retailer: 'Target',
    purchaseDate: '2022-01-02',
    purchaseTime: '13:13',
    total: '1.25',
    items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
  };

  describe('when receipt is valid', () => {
    it('responds with 200 status and id object', (done) => {
      request(server)
        .post('/receipts/process')
        .send(receipt)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          uuid = res.body.id;
          expect(typeof uuid).toEqual('string');
          return done();
        });
    });
  });

  describe('when receipt is invalid', () => {
    it('responds with 400 status', (done) => {
      request(server).post('/receipts/process')
        .send({ receipt: 'fake' })
        .expect(400, done);
    });
  });
});

describe('/receipts/:id/points', () => {
  describe('when uuid is valid', () => {
    it('responds with 200 status and points object', (done) => {
      request(server)
        .get(`/receipts/${uuid}/points`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(typeof res.body.points).toEqual('number');
          return done();
        });
    });
  });

  describe('when uuid is invalid', () => {
    it('responds with 404 status', (done) => {
      request(server)
        .get(`/receipts/${123}/points`)
        .expect(404, done);
    });
  });
});
