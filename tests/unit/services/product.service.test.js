const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsList } = require('../models/mocks/product.model.mock');
const { productService } = require('../../../src/services');
const { error } = require('./mocks/product.service.mock');

describe('Testa a unidade services de produtos', function () {
  describe('Verifica a lista de produtos', function () {
    it('Deve tornar um array de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(productsList);

      const result = await productService.getProducts();

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(productsList);
    });
  });

  describe('Verifica o retorno de um produto pelo id', function () {
    it('Deve retornar um produto com o id válido', async function () {
      sinon.stub(productModel, 'findById').resolves([[productsList[0]]]);

      const result = await productService.getProductById(1);

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal([[productsList[0]]]);
    });

    it('Deve retornar erro para um produto inválido', async function () {
      sinon.stub(productModel, 'findById').resolves(null);

      const result = await productService.getProductById(5);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal({message: 'Product not found'});
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});