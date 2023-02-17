const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { salesList, saleById, newSale, resultNewSale, saleUpdated, requestUpdate } = require('./mocks/sales.model.mock');

describe('Teste de unidade do model de vendas', function () {
  it('Obtendo a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesList]);

    const result = await salesModel.innerAllSales();

    expect(result).to.be.deep.equal(salesList);
  });

  it('Obtendo a venda através do id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);

    const result = await salesModel.innerSales(1);

    expect(result).to.be.deep.equal(saleById);
  });

  it('Cadastrando uma nova compra', async function () {
    sinon.stub(connection, 'execute').resolves([resultNewSale]);

    const id = await salesModel.insert();
    const { productId, quantity } = newSale;
    const result = await salesModel.insertProducts(id, productId, quantity);

    expect(result).to.equal(resultNewSale);
  });

  it('Atualizando uma venda de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([saleUpdated]);

    const result = await salesModel.updateSale(2, requestUpdate);

    expect(result).to.equal(saleUpdated);
  });

  it('Deletando a venda de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModel.deleteSale(1);

    expect(result).to.equal();
  });

  afterEach(function () {
    sinon.restore();
  });
});