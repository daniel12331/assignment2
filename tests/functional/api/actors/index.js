import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import api from "../../../../index";
import User from "../../../../api/users/userModel";

const expect = chai.expect;
let db;
let usertoken;
//Chris pine actor id
const chrispine = 62064;
describe("Actors endpoint", () => {
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


  

  describe("GET /api/actor/page/:pageNumber ", () => {
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

    it("should return 20 actors and a status 200", (done) => {
      request(api)
        .get(`/api/actor/page/${1}`)
        .set({ "Authorization": `Bearer ${usertoken}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done()
        });
    });
  });

  describe("GET /api/actor/:id ", () => {

  it("should get Chris Pine the actor and a status 200", (done) => {
    request(api)
      .get(`/api/actor/${chrispine}`)
      .set({ "Authorization": `Bearer ${usertoken}` })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("object");
        expect(res.body.name).to.equal("Chris Pine");
        done()
      });
  });
});

describe("GET /api/actor/credits/:id ", () => {

    it("get Chris Pines credits (Blind Dating) and a status 200", (done) => {
      request(api)
        .get(`/api/actor/credits/${chrispine}`)
        .set({ "Authorization": `Bearer ${usertoken}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.cast).to.be.a("array");
          expect(res.body.cast[0].title).to.equal("Blind Dating");
          done()
        });
    });
  });
  describe("GET /api/actor/page/:pageNumber - UnAuth Test", () => {
    it("should return 401 Unauthorized", (done) => {
      request(api)
        .get(`/api/actor/page/1`)
        .set({ "Authorization": `Bearer ${null}` })
        .set("Accept", "application/json")
        .expect(401)
        .then((res) => {
          expect(res.text).to.equal("Unauthorized")
          done()
        });
    });
  });

  });
