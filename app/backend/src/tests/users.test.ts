import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;

import Users from '../database/models/UsersModel';
import * as jsonwebtoken from 'jsonwebtoken';
import {
  requestError,
  mockBadReq1,
  mockBadReq2,
  requestOk,
  mockToken,
  mockUser,
} from './mocks/users.mock';


describe('testa comportamento da /login', () => {
  describe('testa a verificação do /login', () => {

    after(()=>{
      sinon.restore();
    });

    test('em caso de email ou senha indefinidos', async () => {
      const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({});

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(mockBadReq1);
    });

    test('em caso de email ou senha errados', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(requestError);

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal(mockBadReq2);
    });

    test('em caso de sucesso', async () => {
      sinon.stub(Users, 'findOne')
        .resolves(mockUser as Users);
      
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(requestOk);
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(mockToken);
    });
  });

  describe('testa a verificação da /login/validate', () => {

    after(()=>{
      sinon.restore();
    });

    test('se a rota tem o retorno esperado', async () => {
      sinon.stub(jsonwebtoken, 'verify')
        .callsFake(() => { dataValues: mockUser.role });

      const { status, body } = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', mockToken.token);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ role: mockUser.role });
    });
  });
});
