require('dotenv').config();
const mongoose = require("mongoose");
const request = require("supertest");
const http = require("http");
const app = require("../server");

let server;

beforeAll((done) => {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      server = http.createServer(app);
      server.listen(5000, () => {
        console.log("Test server running on port 5000");
        done();
      });
    })
    .catch(err => done(err));
});

afterAll((done) => {
  mongoose.connection.close()
    .then(() => {
      server.close(done);
    })
    .catch(err => done(err));
});

describe("API Endpoints", () => {
  it("should fetch historical data", async () => {
    const response = await request(server).get("/api/responses");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
