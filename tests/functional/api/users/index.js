import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import api from "../../../../index";
import movie from "./Favdata";
import narniaid from "./movieid";

//Movie Data
const expect = chai.expect;
let db;
let user1token;

const movieid = 411;
describe("Users endpoint", () => {
  before( async() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;

    await User.deleteMany();
    try {
      // Register two users
      await request(api).post("/api/users?action=register").send({
        username: "user1",
        password: "test1",
      });
      await request(api).post("/api/users?action=register").send({
        username: "user2",
        password: "test2",
      });
    } catch (err) {
      console.error(`failed to Load user test Data: ${err}`);
    }
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  afterEach(() => {
    api.close();
  });
  describe("GET /api/users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST /api/users ", () => {
    describe("For a register action", () => {
      describe("when the payload is correct", () => {
        it("should return a 201 status and the confirmation message", () => {
          return request(api)
            .post("/api/users?action=register")
            .send({
              username: "user3",
              password: "test3"
            })
            .expect(201)
            .expect({ msg: "Successful created new user.", code: 201 });
        });
        after(() => {
          return request(api)
            .get("/api/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body.length).to.equal(3);
              const result = res.body.map((user) => user.username);
              expect(result).to.have.members(["user1", "user2", "user3"]);
            });
        });
      });
    });
    describe("For an authenticate action", () => {
      describe("when the payload is correct", () => {
        it("should return a 200 status and a generated token", () => {
          return request(api)
            .post("/api/users?action=authenticate")
            .send({
              username: "user1",
              password: "test1"
            })
            .expect(200)
            .then((res) => {
              expect(res.body.success).to.be.true;
              expect(res.body.token).to.not.be.undefined;
              user1token = res.body.token.substring(7);
            });
        });
      });
    });
  });

  describe("POST /api/users/add/:userName/favourites", () => {

    it("should return the success of adding a favourite and confirm the user who added the favourite", () => {
      return request(api)
        .post("/api/users/add/user1/favourites")
        .send({
        movie
        })
        .expect(201)
        .then((res) => {
          expect(res.ok).to.equal(true);
          expect(res.body.favourites.length).to.equal(1);
          expect(res.body.username).to.equal("user1");
        });
    });
  });

  describe("Get /api/users/:userName/favourites", () => {
    it("should return the success of getting favourites and checks for favourite added by the previous test", (done) => {
     request(api)
        .get("/api/users/user1/favourites")
        .set({ "Authorization": `Bearer ${user1token}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)

        .expect(200)
        .then((res) => {
          console.log(res.body[0].movie.title)
            expect(res.body[0].movie.title).to.equal("The Chronicles of Narnia: The Lion, the Witch and the Wardrobe");
          done()
        });
    });
  });

  describe("DELETE /api/users/:userName/delete/favourites", () => {
    it("should return the 201 and successfully delete the previous favourite added", () => {
       return request(api)
      .delete("/api/users/user1/delete/favourites")
      .send({
      narniaid
      })
      .expect(201)
      .then((res) => {
       expect(res.body.favourites.length).to.equal(0)
      });
    });
  });
});
