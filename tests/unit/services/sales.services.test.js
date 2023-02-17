const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesList, saleById, newSale,
  resultNewSale, saleUpdated, requestUpdate } = require('../models/mocks/sales.model.mock');
const { salesService } = require('../../../src/services');

describe('Testa a unidade services de vendas', function () {
  describe('Verifica a lista de vendas', function () {
    it('Deve tornar um array de vendas', async function () {
      sinon.stub(salesModel, 'innerAllSales').resolves(salesList);

      const result = await salesService.getAllSales();

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(salesList);
    });
  });

  describe('Verifica o retorno de uma sale pelo id', function () {
    it('Deve retornar um produto com o id válido', async function () {
      sinon.stub(salesModel, 'innerSales').resolves(saleById);

      const result = await salesService.getSaleById(1);

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(saleById);
    });
  });

  describe('Verifica se é possível criar uma venda', function () {
    it('Deve retornar a criação da venda', async function () {
      sinon.stub(salesModel, 'insert').resolves(3);
      sinon.stub(salesModel, 'insertProducts').resolves([resultNewSale]);

      const result = await salesService.insertSale(newSale);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(resultNewSale);
    })
  });

  describe('Verifica se é possível atualizar uma venda', function () {
    it('Deve atualizar a venda com sucesso', async function () {
      sinon.stub(salesModel, 'updateSale').resolves(saleUpdated);

      const result = await salesService.updateSaleById(2, requestUpdate);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleUpdated);
    });
  });

  describe('Verifica se é possível deletar uma venda', function () {
    it('Deve retornar type null e mensagem vazia caso for deletado', async function () {
      sinon.stub(salesModel, 'deleteSale').resolves();

      const result = await salesService.deleteSaleById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal();
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});