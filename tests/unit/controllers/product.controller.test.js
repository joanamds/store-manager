const chai = require('chai');
const { expect, calledWith } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
// const errorMap = require('../../../src/utils/errorMap');
const productService = require('../../../src/services/products.service');
const productController = require('../../../src/controllers/product.controller');

const { allProducts, product } = require('./mocks/product.controller.mock');

chai.use(sinonChai);

describe('Teste de unidade do controller de produtos', function () {
  it('Deve retornar a lista de produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProducts')
      .resolves({ type: null, message: allProducts });
    
    await productController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Deve retornar o produto de acordo com o id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProductById')
      .resolves({ type: null, message: product });

    await productController.listProducts(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product);
  });

  afterEach(function () {
    sinon.restore();
  });
});





