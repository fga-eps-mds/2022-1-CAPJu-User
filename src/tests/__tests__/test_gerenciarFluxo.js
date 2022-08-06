import supertest from "supertest";
import { mongoDB } from "../fixtures";
import app from "../../app";

const STAGE1 = "Junior";

const createUser = async (user) => {
  return await supertest(app).post("/newUser").send({
    name: user,
  });
};

let resUser1, userArray, sequenceArray;

beforeAll(async () => {
  mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();
  const resUser1 = await createUser(STAGE1);
  userArray = [resUser1.body._id];
});

afterAll((done) => {
  mongoDB.disconnect(done);
});

test.skip("testa fluxo criado", () => {
  expect(resUser1.status).toBe(200);
  expect(resUser1.body).toEqual({
    name: "Junior",
    ...resUser1.body,
  });
});
