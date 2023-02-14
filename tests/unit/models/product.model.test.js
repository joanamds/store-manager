const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { productsList, product } = require('./mocks/product.model.mock');

describe('Teste de unidade do model de produtos', function () {
  it('Obtendo a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsList]);

    const result = await productModel.findAll();

    expect(result).to.be.deep.equal(productsList);
  });

  it('Obtendo o produto através do id', async function () {
    sinon.stub(connection, 'execute').resolves([[productsList[0]]]);

    const result = await productModel.findById(1);

    expect(result).to.be.deep.equal(productsList[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});