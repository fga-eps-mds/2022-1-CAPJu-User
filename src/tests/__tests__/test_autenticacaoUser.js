// import User from "schemas/User";
import supertest from "supertest";
import app from "../../app";
import { mongoDB } from "../fixtures";
import jwt from "jsonwebtoken";

const generateToken = (ID) => {
  return jwt.sign({ ID }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const NAME = "Will";
const EMAIL = "will@gmail.com";
const PASSWORD = "will123";
const ID = "63042d727576f01df37ad552";
const TOKEN = generateToken(ID);
const PASSWORDCRIPTO =
  "$2b$10$vtXewtwsqi.8/ySCn3VnhuJWpnDhJGt7JtAVnsuA1EEegNVdy.x7C";

let globalResponse;

beforeAll(async () => {
  mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();
  globalResponse = await supertest(app)
    .post("/newUser")
    .set("Content-Type", "application/json")
    .send({
      name: NAME,
      email: EMAIL,
      password: PASSWORDCRIPTO,
    });
});

afterAll((done) => {
  mongoDB.disconnect(done);
});
//createUser---------------------------------
describe("post new user", () => {
  test("testa o endpoint newUser", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toEqual({
      _id: ID,
      name: NAME,
      email: EMAIL,
      token: TOKEN,
      ...globalResponse.body,
    });
  });
  test("testa o endpoint newUser se der errado", async () => {
    const response = await supertest(app).post("/newUser").send({
      email: EMAIL,
    });
    expect(response.status).toBe(500);
  });
});
//Login----------------------------------------------------OKOK
describe("post login", () => {
  test("testa o endpoint login", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toEqual({
      _id: ID,
      name: NAME,
      email: EMAIL,
      token: TOKEN,
      ...globalResponse.body,
    });
  });
  test("testa o endpoint login se der errado", async () => {
    const response = await supertest(app).get("/login").send({
      name: NAME,
    });
    expect(response.status).toBe(404);
  });
});
//allUser----------------------------------------------------------------OKOK
describe("all user", () => {
  test("testa o endpoint allUser", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toEqual({
      _id: ID,
      name: NAME,
      email: EMAIL,
      token: TOKEN,
      ...globalResponse.body,
    });
  });
  test("testa o endpoint allUser se der errado", async () => {
    const response = await supertest(app).get("/allUser");
    expect(response.status).toBe(401);
  });
});
//user--------------------------------------------------------
describe("user", () => {
  test("testa o endpoint user", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toEqual({
      name: NAME,
    });
  });
  test("testa o endpoint user se der errado", async () => {
    const response = await supertest(app).get("/user");
    expect(response.status).toBe(500);
  });
});
