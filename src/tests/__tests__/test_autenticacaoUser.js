import supertest from "supertest";
import app from "../../app";
import { mongoDB } from "../fixtures";
import User from "../../schemas/User.js";

//const--------------------------------------------------
const NAME = "Will";
const EMAIL = "will@gmail.com";
const EMAIL2 = "joãoTest@gmail.com";
const PASSWORDCRIPTO =
  "$2b$10$vtXewtwsqi.8/ySCn3VnhuJWpnDhJGt7JtAVnsuA1EEegNVdy.x7C";
const ID = "6312a097ddee03692aefdfd9";
const NEWEMAIL = "newWill@gmail.com";
const PASSWORDCRIPTO2 =
  "$8b$98$vtXextwszi.8/iSC4LnhuJWpnDhJGt7JtAVnsuA1JJegNVdy.x7C";
const ROLE = 1;
//---------------------------------------------------------
let globalResponse;
let loginResponse;
let allUserResponse;
let updateUserResponse;
let updateUserResponsePassword;
let acceptResponse;
let globalResponse2;
//----------------------------------------------------------

jest.setTimeout(30000);

//--------------------------------------------
beforeAll(async () => {
  await mongoDB.disconnect();
  await mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();
  globalResponse = await supertest(app)
    .post("/newUser")
    .set("Content-Type", "application/json")
    .send({
      name: NAME,
      email: EMAIL,
      password: PASSWORDCRIPTO,
      role: ROLE,
    });
  globalResponse2 = await supertest(app)
    .post("/newUser")
    .set("Content-Type", "application/json")
    .send({
      name: "João",
      email: EMAIL2,
      password: PASSWORDCRIPTO2,
      role: ROLE,
    });
  await User.updateOne({ _id: globalResponse.body._id }, { accepted: true });
  acceptResponse = await supertest(app)
    .post(`/acceptRequest/${globalResponse.body._id}`)
    .set("Authorization", `Bearer ${globalResponse.body.token}`);
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
test("testa o endpoint de aceitar solicitação", async () => {
  expect(acceptResponse.status).toBe(200);
  const user = await User.findOne({ _id: globalResponse.body._id });
  expect(user.accepted).toEqual(true);
});

describe("testando a função post login", () => {
  test("testa o endpoint login", async () => {
    loginResponse = await supertest(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({
        email: EMAIL,
        password: PASSWORDCRIPTO,
      });
    expect(loginResponse.body).toHaveProperty("email");
    expect(loginResponse.body).toHaveProperty("token");
    expect(loginResponse.status).toBe(200);
  });

  test("testa se nao autorizado", async () => {
    loginResponse = await supertest(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({
        email: EMAIL2,
        password: PASSWORDCRIPTO2,
      });
    expect(loginResponse.status).toBe(401);
  });
  test("testa o endpoint login se der errado", async () => {
    const response = await supertest(app).get("/login").send({
      name: NAME,
    });
    expect(response.status).toBe(404);
  });
});

//allUser---------------------------------------------------
describe("testando a função get allUser", () => {
  test("se der certo", async () => {
    allUserResponse = await supertest(app)
      .get("/allUser")
      .set("Content-Type", "application/json");
    console.log("chaga", allUserResponse);
    expect(allUserResponse);
  });
});

//updateUser(edit email)---------------------------------------------------------------
describe("testando a função put updateUser", () => {
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
describe("testando a função put updateUser", () => {
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

//user--------------------------------------------------------
describe("user", () => {
  test("testa o endpoint user", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toHaveProperty("email");
  });
  test("testa o endpoint user se der errado", async () => {
    const userReponse = await supertest(app).get("/user").send({ name: "" });
    console.log(userReponse);
    expect(userReponse.status).toBe(404);
  });
});

//Edit Role
describe("Alterando perfil de acesso", () => {
  test("testa o endpoint editRoleUser", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toHaveProperty("role");
    expect(globalResponse.body).toHaveProperty("_id");
  });
  test("Testa alterar perfil", async () => {
    const response = await supertest(app)
      .put("/updateRole")
      .set("Content-Type", "application/json")
      .send({
        _id: globalResponse.body._id,
        role: 3,
      });
    expect(response.status).toBe(200);
  });
  test("Testa falha ao Alterar Role", async () => {
    const response = await supertest(app)
      .put("/updateRole")
      .set("Content-Type", "application/json")
      .send({
        _id: "",
      });
    expect(response.status).toBe(500);
  });
});

//requestRecoveryMail
describe("Recuperar senha", () => {
  test("testa endpoint requestRecoveryMail", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toHaveProperty("email");
  });
  test("Testa falha ao recuperar senha", async () => {
    const response = await supertest(app)
      .post("/requestRecovery")
      .set("Content-Type", "application/json")
      .send({
        email: "jonas@gmail.com",
      });
    expect(response.status).toBe(404);
  });
});

test("testa endpoint de recusar solicitação", async () => {
  const deleteResponse = await supertest(app)
    .delete(`/deleteRequest/${globalResponse.body._id}`)
    .set("Authorization", `Bearer ${globalResponse.body.token}`);

  const user = await User.findOne({ _id: globalResponse.body._id });

  expect(user).toEqual(null);
  expect(deleteResponse.status).toBe(200);
});
