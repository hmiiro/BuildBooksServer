const { gql } = require('apollo-server');

module.exports = gql`
  type Bill {
    id: ID!
    transDt: String!
    billNo: String!
    totItems: Int!
    totAmt: Int!
    totPaid: Int!
    totBal: Int!
    supplier: String!
    status: String!
    isActive: String!
    createdAt: String!
    user: String!
    billItems: [BillItem]!
  }
  type BillItem {
    id: ID!
    name: String!
    itemCode: String!
    desc: String
    qty: Int!
    rate: Int!
    isActive: String!
    createdAt: String!
  }
  type Item {
    id: ID!
    itemCode: String!
    name: String!
    desc: String
    label: String
    value: String
    isActive: String!
    createdAt: String!
  }
  input ItemInput {
    name: String!
    desc: String
  }
  type Supplier {
    id: ID!
    supId: String!
    name: String!
    contact: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    role: String!
    actions: [String!]
    createdAt: String!
  }
  input BillInput {
    transDt: String!
    supplier: String!
    totItems: Int!
    totAmt: Int!
    totPaid: Int!
    totBal: Int!
    billItems: [BillItemInput]!
  }
  input BillItemInput {
    itemCode: String!
    name: String!
    desc: String
    qty: Int!
    rate: Int!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getBills: [Bill]
    getBill(billNo: String!): Bill
    getBillItems: [BillItem]
    getItems: [Item]
    getItem: Item
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createBill(input: BillInput!): Bill!
    deleteBill(billNo: String!): String!
    deleteBillPermanently(billNo: String!): String!
    createItem(input: ItemInput!): Item!
    deleteItem(itemCode: String!): String
    deleteItemPermanently(itemCode: String!): String
  }
`;
