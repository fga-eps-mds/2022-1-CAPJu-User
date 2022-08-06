import supertest from "supertest";
import app from "../../app";
import { mongoDB } from "../fixtures";

const REGISTRO = "1234";

let globalResponse;

beforeAll(async () => {
  mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();
  globalResponse = await supertest(app)
    .post("/newProcess")
    .set("Content-Type", "application/json")
    .send({
      registro: REGISTRO,
      apelido: "bar",
      arquivado: false,
      etapaAtual: "492482348239mvs342",
      etapas: [{etapa: "3423432432vsf", duracao: 5, observacoes: 'Perito nomeado com sucesso!'}],
      fluxoId: '32483scs3424234'
    });
});

afterAll((done) => {
  mongoDB.disconnect(done);
});

describe.skip("post new process", () => {
  test("testa o endpoint newProcess", async () => {
    expect(globalResponse.status).toBe(200);
    expect(globalResponse.body).toEqual({
      registro: REGISTRO,
      apelido: "bar",
      ...globalResponse.body,
    });
  });

  test("testa o endpoint newProcess se der errado", async () => {
    const response = await supertest(app)
      .post("/newProcess")
      .set("Content-Type", "application/json")
      .send({
        apelido: "bar",
      });
    expect(response.status).toBe(500);
  });
});

describe.skip("delete processes", () => {
  test(" testa o endpoint deleteProcess", async () => {
    const response = await await supertest(app).delete(
      `/deleteProcess/${REGISTRO}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      deletedCount: 1,
      acknowledged: true,
    });

    const responseError = await await supertest(app).delete(
      `/deleteProcess/${REGISTRO}`
    );
    expect(responseError.status).toBe(500);
  });
});
