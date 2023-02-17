const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsList, productUpdated } = require('../models/mocks/product.model.mock');
const { productService } = require('../../../src/services');
const { error, newProduct } = require('./mocks/product.service.mock');

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

  describe('Verifica se é possível criar um produto', function () {
    it('Deve retornar a criação do produto', async function () {
      sinon.stub(productModel, 'insertProduct').resolves(4);

      const result = await productService.createProduct('Capa do Super Homem');

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newProduct);
    })

    it('Deve retornar falha caso a função não tenha um name', async function () {
      sinon.stub(productModel, 'insertProduct').rejects(new Error);

      const result = await productService.createProduct();

      expect(result.type).to.equal('BAD_REQUEST');
      expect(result.message).to.deep.equal({ message: '"name" is required' });
    });

    it('Deve retornar falha caso o name não tenha 5 caracteres ou mais', async function () {
      sinon.stub(productModel, 'insertProduct').rejects(new Error);
      const result = await productService.createProduct('Gr');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal({
        message: '"name" length must be at least 5 characters long'
      });
    });    
  });

  describe('Verifica se é possível atualizar um producto', function () {
    it('Deve atualizar um produto com sucesso', async function () {
      sinon.stub(productModel, 'updateProductById').resolves(productUpdated);

      const result = await productService.updateById(1, { name: 'Máscara do Maskara' });

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productUpdated);
    });
  })

  describe('Verifica se é possível deletar um produto', function () {
    it('Deve retornar type null e mensagem vazia caso for deletado', async function () {
      sinon.stub(productModel, 'deleteProduct').resolves();

      const result = await productService.deleteById(2);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal();
    });

    it('Deve retornar erro caso o id não exista', async function () {
      sinon.stub(productModel, 'deleteProduct').rejects(new Error);

      const result = await productService.deleteById(99);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal({ message: 'Product not found'});
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});