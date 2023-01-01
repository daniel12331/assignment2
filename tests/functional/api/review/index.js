import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import api from "../../../../index";
import User from "../../../../api/users/userModel";

const expect = chai.expect;
let db;
let usertoken;
//Avatar movie id.
const avatar = 76600;
describe("Reviews endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      await User.deleteMany();
      await request(api).post("/api/users?action=register").send({
        username: "user1",
        password: "test1"
      });
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });

  describe("POST /api/addreview/:username/reviews/:movieid ", () => {

      it("should return a 200 status and a bearer token", () => {
        return request(api)
          .post("/api/users")
          .send({
            username: "user1",
            password: "test1"
          })
          .expect(200)

          .then((res) => {
            expect(res.body.success).to.be.true;
            usertoken = res.body.token.substring(7);
          });
        });

        it("should return a 201 status and the user who created the review", () => {
            return request(api)
              .post(`/api/addreview/${"user1"}/reviews/${411}?action=addreview`)
              .set({ "Authorization": `Bearer ${usertoken}` })
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .send({
                review: "Wow, the movie was amazing!",
                rating: "10"
              })
              .expect(201)
              .then((res) => {
                expect(res.body.msg).to.equal("Successful created new review by user1.");
              });
            });
        });


  describe("GET /api/addreview/:movieid/reviews ", () => {

    it("should return the review and rating made from the previous test", (done) => {
       request(api)
        .get(`/api/addreview/${411}/reviews`)
        .set({ "Authorization": `Bearer ${usertoken}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body[0].rating).to.equal(10);
          expect(res.body[0].review).to.equal("Wow, the movie was amazing!");
            done()
        });
    });
    });

  });
