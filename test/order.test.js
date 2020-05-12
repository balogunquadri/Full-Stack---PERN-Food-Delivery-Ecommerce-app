import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import app from '../api/index';
import User from '../api/models/user';
import Meal from '../api/models/meals';
import OrderItem from '../api/models/orderItem';

config();

const secret = process.env.JWT_SECRET;

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const userPayload = {
  name: 'Bruce Wayne',
  email: 'bruce@batman.com',
  phone: '07075748392',
  password: 'waynemanor',
  type: 'user'
};

const user2Payload = {
  name: 'Damien Wayne',
  email: 'damien@batman.com',
  phone: '07075748392',
  password: 'waynemanor',
  type: 'user'
};

const user3Payload = {
  name: 'Dick Grayson',
  email: 'dick@batman.com',
  phone: '07075748392',
  password: 'waynemanor',
  type: 'user'
};

const user4Payload = {
  name: 'Jason Todd',
  email: 'todd@batman.com',
  phone: '07075748392',
  password: 'waynemanor',
  type: 'user'
};

const user5Payload = {
  name: 'The Boss',
  email: 'the boss@batman.com',
  phone: '07075748392',
  password: 'waynemanor',
  type: 'user'
};

const catererPayload = {
  name: 'Joffery Baratheon',
  phone: '07075748391',
  email: 'caterer@foodie.com',
  catering_service: 'Iron Throne Eats',
  password: 'oursisthefury',
  type: 'caterer'
};

const caterer2Payload = {
  name: 'Joffery Baratheon',
  phone: '07075748391',
  email: 'caterer@got.com',
  catering_service: 'Iron Throne Eats',
  password: 'oursisthefury',
  type: 'caterer'
};

const caterer3Payload = {
  name: 'Joffery Baratheon',
  phone: '07075748391',
  email: 'email@got.com',
  catering_service: 'Iron Throne Eats',
  password: 'oursisthefury',
  type: 'caterer'
};

const caterer4Payload = {
  name: 'King Baratheon',
  phone: '07075748391',
  email: 'iron@got.com',
  catering_service: 'Iron Throne Eats',
  password: 'oursisthefury',
  type: 'caterer'
};

const caterer5Payload = {
  name: 'Cerci Lannister',
  phone: '07075748391',
  email: 'iron@queen.com',
  catering_service: 'Iron Throne Eats',
  password: 'oursisthefury',
  type: 'caterer'
};

before(done => {
  Promise.all([User.create(userPayload), User.create(catererPayload)]).then(() => {
    done();
  });
});

describe('Order Endpoints', () => {
  context('Get all Orders (Caterer)', () => {
    it(`GET ${API_PREFIX}/orders - Fetch All Orders (Unauthorized)`, done => {
      chai
        .request(app)
        .get(`${API_PREFIX}/orders`)
        .then(res => {
          expect(res).to.have.status(401);
          assert.equal(res.body.status, 'error');
          done();
        })
        .catch(err => console.log('GET /orders', err.message));
    });
    it(`GET ${API_PREFIX}/orders - Fetch All Orders - (Caterer Authorized)`, done => {
      User.findOne({ where: { email: catererPayload.email } })
        .then(caterer => {
          const { id, name, email, phone, type } = caterer;
          const token = jwt.sign(
            {
              user: { id, name, email, phone, type }
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .get(`${API_PREFIX}/orders`)
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
              expect(res).to.have.status(200);
              assert.equal(res.body.status, 'success');
              done();
            })
            .catch(err => console.log('GET /orders', err.message));
        })
        .catch(err => console.log(err.errors[0].name));
    });
  });

  context('Add to Orders (User)', () => {
    User.create(caterer2Payload)
      .then(caterer => {
        return Meal.create({
          name: 'Dummy Meal',
          price: 500,
          imageUrl: 'fk.png',
          quantity: 2,
          catererId: caterer.id
        });
      })
      .then(meal => {
        it(`POST ${API_PREFIX}/orders - Add To Orders (Unauthorized)`, done => {
          chai
            .request(app)
            .post(`${API_PREFIX}/orders`)
            .send({
              mealId: meal.id,
              quantity: 1
            })
            .then(res => {
              expect(res).to.have.status(401);
              assert.equal(res.body.status, 'error');
              done();
            })
            .catch(err => console.log('POST /orders', err.message));
        });
        it(`POST ${API_PREFIX}/orders - Add To Orders - (Validation Test)`, done => {
          User.findOne({ where: { email: userPayload.email } }).then(user => {
            const { id, name, email, phone, type } = user;
            const token = jwt.sign(
              {
                user: { id, name, email, phone, type }
              },
              secret,
              {
                expiresIn: 86400
              }
            );
            chai
              .request(app)
              .post(`${API_PREFIX}/orders`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                mealId: meal.id
              })
              .then(res => {
                expect(res).to.have.status(400);
                assert.equal(res.body.status, 'error');
                done();
              })
              .catch(err => console.log('POST /orders', err.message));
          });
        });
        it(`POST ${API_PREFIX}/orders - Add To Orders - (User can Add to Order)`, done => {
          User.findOne({ where: { email: userPayload.email } }).then(user => {
            const { id, name, email, phone, type } = user;
            const token = jwt.sign(
              {
                user: { id, name, email, phone, type }
              },
              secret,
              {
                expiresIn: 86400
              }
            );
            chai
              .request(app)
              .post(`${API_PREFIX}/orders`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                mealId: meal.id,
                quantity: 1
              })
              .then(res => {
                expect(res).to.have.status(200);
                assert.equal(res.body.status, 'success');
                done();
              })
              .catch(err => console.log('POST /orders', err.message));
          });
        });
      })
      .catch(err => console.log(err.message));
  });

  context('Modify Orders (Users)', () => {
    User.create(caterer3Payload)
      .then(caterer => {
        return Meal.create({
          name: 'Dummy Meal',
          price: 500,
          quantity: 4,
          imageUrl: 'fk.png',
          catererId: caterer.id
        });
      })
      .then(meal => {
        User.create(user2Payload)
          .then(user => {
            return OrderItem.create({ mealId: meal.id, quantity: 3, userId: user.id });
          })
          .then(orderItem => {
            it(`PUT ${API_PREFIX}/orders/:orderId - Modify Orders (Unauthorized)`, done => {
              chai
                .request(app)
                .put(`${API_PREFIX}/orders/${orderItem.id}`)
                .send({
                  action: 'increase'
                })
                .then(res => {
                  expect(res).to.have.status(401);
                  assert.equal(res.body.status, 'error');
                  done();
                })
                .catch(err => console.log('PUT /orders/:orderId', err.message));
            });
            it(`PUT ${API_PREFIX}/orders/:orderId - Modify Orders (Validation Test)`, done => {
              User.findOne({ where: { email: user2Payload.email } }).then(user => {
                const { id, name, email, phone, type } = user;
                const token = jwt.sign(
                  {
                    user: { id, name, email, phone, type }
                  },
                  secret,
                  {
                    expiresIn: 86400
                  }
                );
                chai
                  .request(app)
                  .put(`${API_PREFIX}/orders/${orderItem.id}`)
                  .set('Authorization', `Bearer ${token}`)
                  .send({
                    action: 'something'
                  })
                  .then(res => {
                    expect(res).to.have.status(400);
                    assert.equal(res.body.status, 'error');
                    done();
                  })
                  .catch(err => console.log('PUT /orders/:orderId', err.message));
              });
            });
            it(`PUT ${API_PREFIX}/orders/:orderId - Modify Orders (User Can Increase Order Quantity)`, done => {
              User.findOne({ where: { email: user2Payload.email } }).then(user => {
                const { id, name, email, phone, type } = user;
                const token = jwt.sign(
                  {
                    user: { id, name, email, phone, type }
                  },
                  secret,
                  {
                    expiresIn: 86400
                  }
                );
                chai
                  .request(app)
                  .put(`${API_PREFIX}/orders/${orderItem.id}`)
                  .set('Authorization', `Bearer ${token}`)
                  .send({
                    action: 'increase'
                  })
                  .then(res => {
                    expect(res).to.have.status(200);
                    assert.equal(res.body.status, 'success');
                    done();
                  })
                  .catch(err => console.log('PUT /orders/:orderId', err.message));
              });
            });
            it(`PUT ${API_PREFIX}/orders/:orderId - Modify Orders (User Can Decrease Order Quantity)`, done => {
              User.findOne({ where: { email: user2Payload.email } }).then(user => {
                const { id, name, email, phone, type } = user;
                const token = jwt.sign(
                  {
                    user: { id, name, email, phone, type }
                  },
                  secret,
                  {
                    expiresIn: 86400
                  }
                );
                chai
                  .request(app)
                  .put(`${API_PREFIX}/orders/${orderItem.id}`)
                  .set('Authorization', `Bearer ${token}`)
                  .send({
                    action: 'decrease'
                  })
                  .then(res => {
                    expect(res).to.have.status(200);
                    assert.equal(res.body.status, 'success');
                    done();
                  })
                  .catch(err => console.log('PUT /orders/:orderId', err.message));
              });
            });
            it(`PUT ${API_PREFIX}/orders/:orderId - Modify Orders (User Can Delete Order)`, done => {
              User.findOne({ where: { email: user2Payload.email } }).then(user => {
                const { id, name, email, phone, type } = user;
                const token = jwt.sign(
                  {
                    user: { id, name, email, phone, type }
                  },
                  secret,
                  {
                    expiresIn: 86400
                  }
                );
                chai
                  .request(app)
                  .put(`${API_PREFIX}/orders/${orderItem.id}`)
                  .set('Authorization', `Bearer ${token}`)
                  .send({
                    action: 'delete'
                  })
                  .then(res => {
                    expect(res).to.have.status(200);
                    assert.equal(res.body.status, 'success');
                    done();
                  })
                  .catch(err => console.log('PUT /orders/:orderId', err.message));
              });
            });
          });
      })
      .catch(err => console.log(err.message));
  });

  context('Get Order Items (User)', () => {
    User.create(caterer4Payload)
      .then(caterer => {
        return Meal.create({
          name: 'Dummy Meal',
          price: 500,
          quantity: 4,
          imageUrl: 'fk.png',
          catererId: caterer.id
        });
      })
      .then(meal => {
        User.create(user3Payload)
          .then(user => {
            return OrderItem.create({ mealId: meal.id, quantity: 3, userId: user.id });
          })
          .then(() => {
            it(`GET ${API_PREFIX}/orders/user - Fetch Order Items (Unauthorized)`, done => {
              chai
                .request(app)
                .get(`${API_PREFIX}/orders/user`)
                .then(res => {
                  expect(res).to.have.status(401);
                  assert.equal(res.body.status, 'error');
                  done();
                })
                .catch(err => console.log('GET /orders/user', err.message));
            });
            it(`GET ${API_PREFIX}/orders/user - Fetch Order Items - (User Authorized)`, done => {
              User.findOne({ where: { email: user3Payload.email } }).then(user => {
                const { id, name, email, phone, type } = user;
                const token = jwt.sign(
                  {
                    user: { id, name, email, phone, type }
                  },
                  secret,
                  {
                    expiresIn: 86400
                  }
                );
                chai
                  .request(app)
                  .get(`${API_PREFIX}/orders/user`)
                  .set('Authorization', `Bearer ${token}`)
                  .then(res => {
                    expect(res).to.have.status(200);
                    assert.equal(res.body.status, 'success');
                    done();
                  })
                  .catch(err => console.log('GET /orders/user', err.message));
              });
            });
          });
      });
  });

  // context('Checkout Orders (User)', () => {
  //   User.create(caterer5Payload)
  //     .then(caterer => {
  //       return Meal.create({
  //         name: 'Dummy Meal',
  //         price: 500,
  //         quantity: 4,
  //         imageUrl: 'fk.png',
  //         catererId: caterer.id
  //       });
  //     })
  //     .then(meal => {
  //       const newMenu = [];
  //       newMenu.push({
  //         id: meal.id,
  //         name: meal.name,
  //         price: meal.price,
  //         quantity: meal.quantity,
  //         imageUrl: meal.imageUrl,
  //         catererId: meal.catererId
  //       });
  //       return Menu.create({ meals: JSON.stringify(newMenu), catererId: meal.catererId });
  //     })
  //     .then(menu => {
  //       User.create(user4Payload)
  //         .then(user => {
  //           const meals = JSON.parse(menu.meals);
  //           return OrderItem.create({ mealId: meals[0].id, quantity: 1, userId: user.id });
  //         })
  //         .then(() => {
  //           it(`POST ${API_PREFIX}/orders/checkout - Order Checkout (Unauthorized)`, done => {
  //             chai
  //               .request(app)
  //               .post(`${API_PREFIX}/orders/checkout`)
  //               .send({
  //                 billingAddress: 'desert'
  //               })
  //               .then(res => {
  //                 expect(res).to.have.status(401);
  //                 assert.equal(res.body.status, 'error');
  //                 done();
  //               })
  //               .catch(err => console.log('POST /orders/checkout', err.message));
  //           });
  //           it(`POST ${API_PREFIX}/orders/checkout - Order Checkout (Validation Test)`, done => {
  //             User.findOne({ where: { email: user4Payload.email } }).then(user => {
  //               const { id, name, email, phone, type } = user;
  //               const token = jwt.sign(
  //                 {
  //                   user: { id, name, email, phone, type }
  //                 },
  //                 secret,
  //                 {
  //                   expiresIn: 86400
  //                 }
  //               );
  //               chai
  //                 .request(app)
  //                 .post(`${API_PREFIX}/orders/checkout`)
  //                 .set('Authorization', `Bearer ${token}`)
  //                 .send({
  //                   billingAddress: 18828
  //                 })
  //                 .then(res => {
  //                   expect(res).to.have.status(400);
  //                   assert.equal(res.body.status, 'error');
  //                   done();
  //                 })
  //                 .catch(err => console.log('POST /orders/checkout', err.message));
  //             });
  //           });
  //           it(`POST ${API_PREFIX}/orders/checkout - Order Checkout (User Cannot Checkout without order items)`, done => {
  //             User.create(user5Payload).then(user => {
  //               const { id, name, email, phone, type } = user;
  //               const token = jwt.sign(
  //                 {
  //                   user: { id, name, email, phone, type }
  //                 },
  //                 secret,
  //                 {
  //                   expiresIn: 86400
  //                 }
  //               );
  //               chai
  //                 .request(app)
  //                 .post(`${API_PREFIX}/orders/checkout`)
  //                 .set('Authorization', `Bearer ${token}`)
  //                 .send({
  //                   billingAddress: 'somewhere'
  //                 })
  //                 .then(res => {
  //                   expect(res).to.have.status(500);
  //                   assert.equal(res.body.status, 'error');
  //                   done();
  //                 })
  //                 .catch(err => console.log('POST /orders/checkout', err.message));
  //             });
  //           });
  //           it(`POST ${API_PREFIX}/orders/checkout - Order Checkout (User Can Checkout)`, done => {
  //             User.findOne({ where: { email: user4Payload.email } }).then(user => {
  //               const { id, name, email, phone, type } = user;
  //               const token = jwt.sign(
  //                 {
  //                   user: { id, name, email, phone, type }
  //                 },
  //                 secret,
  //                 {
  //                   expiresIn: 86400
  //                 }
  //               );
  //               chai
  //                 .request(app)
  //                 .post(`${API_PREFIX}/orders/checkout`)
  //                 .set('Authorization', `Bearer ${token}`)
  //                 .send({
  //                   billingAddress: 'somewhere'
  //                 })
  //                 .then(res => {
  //                   expect(res).to.have.status(201);
  //                   assert.equal(res.body.status, 'success');
  //                   done();
  //                 })
  //                 .catch(err => console.log('POST /orders/checkout', err.message));
  //             });
  //           });
  //         });
  //     })
  //     .catch(err => console.log(err.message));
  // });
});

after(done => {
  Promise.all([
    User.destroy({ where: { email: userPayload.email } }),
    User.destroy({ where: { email: catererPayload.email } }),
    User.destroy({ where: { email: caterer2Payload.email } }),
    User.destroy({ where: { email: caterer3Payload.email } }),
    User.destroy({ where: { email: caterer4Payload.email } }),
    User.destroy({ where: { email: caterer5Payload.email } }),
    User.destroy({ where: { email: user2Payload.email } }),
    User.destroy({ where: { email: user3Payload.email } }),
    User.destroy({ where: { email: user4Payload.email } }),
    User.destroy({ where: { email: user5Payload.email } })
  ]).then(() => {
    done();
  });
});
