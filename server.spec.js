const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  it("server exists", () => {
    expect(server).toBeDefined();
  });

  it("server has a value", () => {
    expect(server).toBeInstanceOf(Function);
  });

  it("index route should return ok status code", async () => {
    const expectedStatusCode = 200;

    const response = await request(server).get("/");

    expect(response.status).toEqual(expectedStatusCode);
  });

  it("should return object type JSON", async () => {
    const response = await request(server).get("/");

    expect(response.type).toEqual("application/json");
  });

  it("index route should return JSON object from index route", async () => {
    const expectedBody = { api: "running" };

    const response = await request(server).get("/");

    expect(response.body).toEqual(expectedBody);
  });

  it("create route should exist", async () => {
    const response = await request(server).post("/foods");

    expect(response.status).not.toEqual(404);
  });

  it("create route should return ok status code", async () => {
    const expectedStatusCode = 201;

    const response = await request(server).post("/foods");

    expect(response.status).toEqual(expectedStatusCode);
  });

  it("Create route should create new food when food name is passed in body", async () => {
    const expectedReturn = { food: "lettuce" };

    await request(server)
      .post("/foods")
      .send({ food: "lettuce" })
      .expect(201, expectedReturn);
  });

  it("Create route should update array", async () => {
    const nextReturn = ["beef", "rice", null, null, "lettuce"];

    await request(server).get("/foods").expect(200, nextReturn);
  });

  it("Delete route should exist", async () => {
    const expectedStatus = 201;

    await request(server).delete("/foods/0").expect(200);
  })

  it("Delete route should update array", async () => {
    const nextReturn = ["rice", null, null, "lettuce"];

    await request(server).get("/foods").expect(200, nextReturn);
  });
});
