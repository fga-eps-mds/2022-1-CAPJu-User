// import User from "schemas/User";
import supertest from "supertest";
import app from "../../app";
import { mongoDB } from "../fixtures";
import bcrypt from "bcrypt";

const NAME = "Will";
const EMAIL = "will@gmail.com";
const PASSWORD = "will123";

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
      password: PASSWORD,
    });
  delete globalResponse.password;
});

afterAll((done) => {
  mongoDB.disconnect(done);
});

describe("post new user", () => {
  test("testa o endpoint newUser", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toEqual({
      name: NAME,
      email: EMAIL,
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
// describe.skip("get all user", () => {
//   test("testa o endpoint newUser", async () => {
//     expect(globalResponse.status).toBe(200);
//     expect(globalResponse.body).toEqual({
//       nome: NAME,
//       email: EMAIL,
//       password: PASSWORD,
//       ...globalResponse.body,
//     });
//   });
//   test("testa o endpoint allUser se der errado", async () => {
//     const response = await supertest(app)
//       .get("/user")
//       .set("Content-Type", "application/json");
//   });
//   expect(response.status).toBe(500);
// });
describe.skip("post login", () => {
  test("testa o endpoint login", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toEqual({
      email: EMAIL,
      password: PASSWORD,
      ...globalResponse.body,
    });
  });
  test("testa o endpoint newUser se der errado", async () => {
    const response = await supertest(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({
        email: EMAIL,
      });
    expect(response.status).toBe(500);
  });
});
