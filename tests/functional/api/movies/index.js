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
describe("Movies endpoint", () => {
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

  describe("GET /api/movies/discover ", () => {
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

    it("should return 20 discover movies and a status 200", () => {
      request(api)
        .get("/api/movies/discover/")
        .set({ "Authorization": `Bearer ${usertoken}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("object");
          expect(res.body.results.length).to.equal(20);
        });
    });
  });
  describe("GET /api/movies/:id ", () => {

    it("should return the title of the movie and a status 200", () => {
      request(api)
        .get(`/api/movies/${avatar}`)
        .set({ "Authorization": `Bearer ${usertoken}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("object");
          expect(res.body.title).to.equal("Avatar: The Way of Water");
        });
    });

    });

    describe("GET /api/movies/reviews/:id ", () => {

      it("should make sure reviews are being returned and a status 200", () => {
        request(api)
          .get(`/api/movies/reviews/${avatar}`)
          .set({ "Authorization": `Bearer ${usertoken}` })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("object");
           expect(res.body.results).to.have.property("content");
          });
      });
  
      });
  });
