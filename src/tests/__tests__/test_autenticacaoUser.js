import supertest from "supertest";
import app from "../../app";
import { mongoDB } from "../fixtures";

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
});

afterAll((done) => {
  mongoDB.disconnect(done);
});

describe.skip("post new user", () => {
  test("testa o endpoint newUser", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toEqual({
      email: EMAIL,
      password: PASSWORD,
      ...globalResponse.body,
    });
  });
  test("testa o endpoint newUser se der errado", async () => {
    const response = await supertest(app)
      .post("/newUser")
      .set("Content-Type", "application/json")
      .send({
        email: EMAIL,
      });
    expect(response.status).toBe(500);
  });
});
