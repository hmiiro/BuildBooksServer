const { gql } = require('apollo-server');

module.exports = gql`
  type Bill {
    id: ID!
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
    itemCode: String!
    desc: String
    qty: Int!
    rate: Int!
    isActive: String!
    createdAt: String!
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
    totItems: Int!
    totAmt: Int!
    totPaid: Int!
    totBal: Int!
    supplier: String
    billItems: [BillItemInput]!
  }
  input BillItemInput {
    itemCode: String!
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
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createBill(input: BillInput!): Bill!
    deleteBill(billNo: String!): String!
    deleteBillPermanently(billNo: String!): String!
    # createBillItem(billItemInput: BillItemInput!): BillItem!
  }
  type Subscription {
    newBill: Bill!
  }
`;
