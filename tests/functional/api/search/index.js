import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import api from "../../../../index";
import User from "../../../../api/users/userModel";

const expect = chai.expect;
let db;
let usertoken;
//Wednesday tvshow id
const searchMovietext = "Hugo";
const searchTvShowtext = "SpongeBob SquarePants";
const searchActortext = "Brad Pitt";
const typeMovie = "movie";
const typeTvShow = "tv";
const typeActor = "person";
const page = 1;
describe("Search endpoint", () => {
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


  describe("GET /api/search/:searchText/:page/:movie ", () => {
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

    it("should return 20 movies, the first movie title being Hugo and a status 200", (done) => {
      request(api)
        .get(`/api/search/${searchMovietext}/${page}/${typeMovie}`)
        .set({ "Authorization": `Bearer ${usertoken}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          expect(res.body.results[0].title).to.equal(searchMovietext);
          done()
        });
    });
  });

  describe("GET /api/search/:searchText/:page/:tv", () => {

    it("should return 4 tvshows, the first tvshow title being Spongebob and a status 200", (done) => {
        request(api)
          .get(`/api/search/${searchTvShowtext}/${page}/${typeTvShow}`)
          .set({ "Authorization": `Bearer ${usertoken}` })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body.results).to.be.a("array");
            expect(res.body.results.length).to.equal(4);
            expect(res.body.results[0].name).to.equal(searchTvShowtext);
            done()
          });
      });
    });
  
  
  
  describe("GET /api/search/:searchText/:page/:person ", () => {

    it("should return 1 actor, the first actor name being Brad pitt and a status 200", (done) => {
        request(api)
          .get(`/api/search/${searchActortext}/${page}/${typeActor}`)
          .set({ "Authorization": `Bearer ${usertoken}` })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body.results).to.be.a("array");
            expect(res.body.results.length).to.equal(1);
            expect(res.body.results[0].name).to.equal(searchActortext);
            done()
          });
      });
    });
  });