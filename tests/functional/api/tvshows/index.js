import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import api from "../../../../index";
import User from "../../../../api/users/userModel";

const expect = chai.expect;
let db;
let usertoken;
//Wednesday tvshow id
const wednesday = 119051;
describe("TVShows endpoint", () => {
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


  

  describe("GET /api/tvshow/page/:pageNumber ", () => {
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

    it("should return 20 tvshows and a status 200", (done) => {
      request(api)
        .get(`/api/tvshow/page/${1}`)
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

  describe("GET /api/tvshow/:id ", () => {

  it("should get Wednesday the tvshow and a status 200", (done) => {
    request(api)
      .get(`/api/tvshow/${wednesday}`)
      .set({ "Authorization": `Bearer ${usertoken}` })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("object");
        expect(res.body.name).to.equal("Wednesday");
        done()
      });
  });
});

describe("GET /api/tvshow/similar/:id ", () => {

    it("get similar tv shows to wednesday called Bewitched and a status 200", (done) => {
      request(api)
        .get(`/api/tvshow/similar/${wednesday}`)
        .set({ "Authorization": `Bearer ${usertoken}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.results.length).to.equal(20);
          done()
        });
    });
  });

  });
