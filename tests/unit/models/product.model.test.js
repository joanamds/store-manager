const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { productsList, productUpdated } = require('./mocks/product.model.mock');

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

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 32}]);

    const result = await productModel.insertProduct({ name: 'Mascara do Batman' });

    expect(result).to.equal(32);
  });

  it('Atualizando o produto de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([productUpdated]);

    const result = await productModel.updateProductById(2, {name: 'Máscara do Maskara'});

    expect(result).to.equal(productUpdated);
  });

  it('Deletando de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await productModel.deleteProduct(1);

    expect(result).to.equal();
  });

  afterEach(function () {
    sinon.restore();
  });
});