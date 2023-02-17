const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const productService = require('../../../src/services/products.service');
const productController = require('../../../src/controllers/product.controller');

const { allProducts, product, newProduct, productUpdated } = require('./mocks/product.controller.mock');

describe('Teste de unidade do controller de produtos', function () {
  it('Deve retornar a lista de produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProducts')
      .resolves({ type: null, message: allProducts });
    
    await productController.listProducts(req, res);

    expect(res.status.calledWith(200)).to.be.equals(true);
    expect(res.json.calledWith(allProducts)).to.be.equals(true);
  });

  it('Deve retornar o produto de acordo com o id', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const req = {
      params: { id: 1 },
    };

    sinon.stub(productService, 'getProductById')
      .resolves({ type: null, message: {...product} });

    await productController.getProduct(req, res);

    expect(res.status.calledWith(200)).to.be.equals(true);
    expect(res.json.calledWith(product)).to.be.equals(true);
  });

  it('Deve criar um novo produto', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      body: { name: 'Capa do Super Homem' }
    };

    sinon.stub(productService, 'createProduct')
      .resolves({ type: null, message: { ...newProduct } });

    await productController.createProduct(req, res);

    expect(res.status.calledWith(201)).to.be.equals(true);
    expect(res.json.calledWith(newProduct)).to.be.equals(true);
  });

  it('Deve retornar erro caso não tenha name', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      body: { name: '' }
    };

    sinon.stub(productService, 'createProduct')
      .resolves({ type: 'BAD_REQUEST', message: { message: '"name" is required' } });

    await productController.createProduct(req, res);

    expect(res.status.calledWith(400)).to.be.equals(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equals(true);
  });

  it('Deve retornar erro caso o name não tenha 5 caracteres ou mais', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      body: { name: 'Gr' }
    };

    sinon.stub(productService, 'createProduct')
      .resolves({
        type: 'INVALID_VALUE', message: {
          message: '"name" length must be at least 5 characters long'
        } });

    await productController.createProduct(req, res);

    expect(res.status.calledWith(422)).to.be.equals(true);
    expect(res.json.calledWith({
      message: '"name" length must be at least 5 characters long'
    })).to.be.equals(true);
  });

  it('Deve atualizar o produto com sucesso', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      params: { id: 1 },
      body: { name: 'Máscara do Maskara' }
    };

    sinon.stub(productService, 'updateById')
      .resolves({
        type: null, message: [productUpdated]
      });

    await productController.updateProduct(req, res);

    expect(res.status.calledWith(200)).to.be.equals(true);
    expect(res.json.calledWith(productUpdated)).to.be.equals(true);
  });

  it('Deve deletar o produto com sucesso', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      params: { id: 3 },
    };

    sinon.stub(productService, 'deleteById')
      .resolves({
        type: null, message: ''
      });

    await productController.deleteProductById(req, res);

    expect(res.status.calledWith(204)).to.be.equals(true);
    expect(res.json.calledWith()).to.be.equals(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});





