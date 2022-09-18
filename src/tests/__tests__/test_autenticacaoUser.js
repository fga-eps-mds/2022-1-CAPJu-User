import supertest from "supertest";
import app from "../../app";
import { mongoDB } from "../fixtures";
//const--------------------------------------------------
const NAME = "Will";
const EMAIL = "will@gmail.com";
const PASSWORDCRIPTO =
  "$2b$10$vtXewtwsqi.8/ySCn3VnhuJWpnDhJGt7JtAVnsuA1EEegNVdy.x7C";
const ID = "6312a097ddee03692aefdfd9";
const NEWEMAIL = "newWill@gmail.com";
//---------------------------------------------------------
let globalResponse;
let loginResponse;
let allUserResponse;
let updateUserResponse;
let updateUserResponsePassword;
//----------------------------------------------------------

jest.setTimeout(30000);

//--------------------------------------------
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
describe("criando usuario", () => {
  test("testa o endpoint newUser", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toHaveProperty("_id");
    expect(globalResponse.body).toHaveProperty("token");
  });
  test("ver se o nome ja existe", async () => {
    const response = await supertest(app).get("/newUser").send({
      name: NAME,
    });
    expect(response.status).toBe(404);
  });
  test("ver se o email ja existe", async () => {
    const response = await supertest(app).get("/newUser").send({
      email: EMAIL,
    });
    expect(response.status).toBe(404);
  });
});
//Login----------------------------------------------------
describe("post login", () => {
  test("testa o endpoint login", async () => {
    loginResponse = await supertest(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({
        email: EMAIL,
        password: PASSWORDCRIPTO,
      });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("_id");
    expect(loginResponse.body).toHaveProperty("token");
  });
  test("testa o endpoint login se der errado", async () => {
    const response = await supertest(app).get("/login").send({
      name: NAME,
    });
    expect(response.status).toBe(404);
  });
});
//allUser---------------------------------------------------
describe("get allUser", () => {
  test("se der certo", async () => {
    allUserResponse = await supertest(app)
      .get("/allUser")
      .set("Content-Type", "application/json");
    expect(allUserResponse);
  });
});
//updateUser(edit email)---------------------------------------------------------------
describe("put updateUser", () => {
  test("testa o endpoint updateUser", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toHaveProperty("_id");
    expect(globalResponse.body).toHaveProperty("token");
  });
  test("se der certo", async () => {
    updateUserResponse = await supertest(app).put(`/updateUser/${ID}`).send({
      email: NEWEMAIL,
    });
    expect(updateUserResponse.status).toBe(200);
  });
  test("se der errado", async () => {
    updateUserResponse = await supertest(app).put(`/updateUser/00001`).send({
      email: "newNewWill@gmail.com",
    });
    expect(updateUserResponse.status).toBe(500);
  });
});

//updateUserPassword(edit password)---------------------------------------------------------------
describe("put updateUser", () => {
  test("testa o endpoint updateUser", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toHaveProperty("_id");
    expect(globalResponse.body).toHaveProperty("token");
  });
  test("se der certo", async () => {
    updateUserResponsePassword = await supertest(app)
      .post(`/updateUserPassword/${globalResponse.body._id}`)
      .send({
        oldPassword: PASSWORDCRIPTO,
        newPassword: "CapJU123",
      });
    expect(updateUserResponsePassword.status).toBe(200);
  });
  test("se der errado", async () => {
    updateUserResponsePassword = await supertest(app)
      .post(`/updateUserPassword/00001`)
      .send({
        oldPassword: PASSWORDCRIPTO,
        newPassword: "CapJU123",
      });
    expect(updateUserResponsePassword.status).toBe(500);
  });
});

// //user--------------------------------------------------------
// describe("user", () => {
//   test("testa o endpoint user", async () => {
//     expect(globalResponse.status).toBe(200);
//     expect(globalResponse.body).toHaveProperty("email");
//     expect(globalResponse.body).toHaveProperty("email");
//   });
//   test("testa o endpoint user se der errado", async () => {
//     const response = await supertest(app).get("/user");
//     expect(response.status).toBe(500);
//   });
// });
