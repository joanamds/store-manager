const salesList = [
  {
    "saleId": 1,
    "date": "2023-02-17T21:29:01.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-17T21:29:01.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-17T21:29:01.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const saleById = [
  {
    "date": "2023-02-17T21:29:01.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-17T21:29:01.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const resultNewSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const saleUpdated = {
  "saleId": 2,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const requestUpdate = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

module.exports = {
  salesList,
  saleById,
  newSale,
  resultNewSale,
  saleUpdated,
  requestUpdate,
}