const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesList, saleById, newSale,
  resultNewSale, saleUpdated, requestUpdate } = require('../models/mocks/sales.model.mock');

describe('Teste de unidade de controller de vendas', function () {
  it('Deve retornar a lista de vendas', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales')
      .resolves({ type: null, message: salesList });

    await salesController.listSales(req, res);

    expect(res.status.calledWith(200)).to.be.equals(true);
    expect(res.json.calledWith(salesList)).to.be.equals(true);
  });

  it('Deve retornar a venda de acordo com o id', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const req = {
      params: { id: 1 },
    };

    sinon.stub(salesService, 'getSaleById')
      .resolves({ type: null, message: { ...saleById } });

    await salesController.getSale(req, res);

    expect(res.status.calledWith(200)).to.be.equals(true);
    expect(res.json.calledWith({...saleById})).to.be.equals(true);
  });

  it('Deve inserir uma nova venda', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      body: newSale,
    };

    sinon.stub(salesService, 'insertSale')
      .resolves({ type: null, message: {...resultNewSale} });

    await salesController.createSale(req, res);

    expect(res.status.calledWith(201)).to.be.equals(true);
    expect(res.json.calledWith(resultNewSale)).to.be.equals(true);
  });

  it('Deve atualizar uma venda com sucesso', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      params: { id: 2 },
      body: { requestUpdate }
    };

    sinon.stub(salesService, 'updateSaleById')
      .resolves({
        type: null, message: saleUpdated
      });

    await salesController.updateSale(req, res);

    expect(res.status.calledWith(200)).to.be.equals(true);
    expect(res.json.calledWith(saleUpdated)).to.be.equals(true);
  });

  it('Deve deletar uma venda com sucesso', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      params: { id: 1 },
    };

    sinon.stub(salesService, 'deleteSaleById')
      .resolves({
        type: null, message: ''
      });

    await salesController.deleteSale(req, res);

    expect(res.status.calledWith(204)).to.be.equals(true);
    expect(res.json.calledWith()).to.be.equals(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});