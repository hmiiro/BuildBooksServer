const { AuthenticationError, UserInputError } = require('apollo-server');
const moment = require('moment');

const Bill = require('../../models/Bill');
const { billStatus } = require('../../util/status');
const checkAuth = require('../../util/check-auth');
const { userRoles } = require('../../util/rolesAndActions');
const { userActions } = require('../../util/rolesAndActions');

module.exports = {
  Query: {
    async getBills() {
      try {
        const bills = await Bill.find({
          status: { $nin: [billStatus.DELETED, billStatus.CANCELLED] },
        }).sort({
          createdAt: -1,
        });
        return bills;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getBill(_, { billNo }) {
      try {
        const bill = await Bill.findOne({ billNo: billNo });
        if (bill) {
          return bill;
        } else {
          throw new Error('Bill not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createBill(parent, { input }, context) {
      const user = checkAuth(context);
      // changing the sent values to an "object"
      const {
        totItems,
        totAmt,
        totPaid,
        totBal,
        supplier,
        billItems,
      } = JSON.parse(JSON.stringify(input));

      // 1st generate billNo
      const billNo = await genBillNo();
      // making sure billNo is generated otherwise dont save anything
      if (!billNo) {
        throw new Error('Error creating Bill');
      }
      // MAKING SURE WE ONLY SAVE A BILL IF IT HAS ITEMS
      if (billItems.length <= 0 || totAmt <= 0) {
        throw new Error(`Error creating bill, no items or total bill is 0`);
      } else {
        // Now generate bill details using the variables created
        try {
          // Now generate Bill instance with its items
          const newBill = new Bill({
            billNo,
            totItems,
            totAmt,
            totPaid,
            totBal,
            supplier,
            billItems: [...billItems],
            user: user.id,
            createdAt: moment().format(),
          });
          // Now save bill details
          const bill = await newBill.save();

          return bill;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    async deleteBill(_, { billNo }, context) {
      const user = checkAuth(context);

      try {
        if (
          user.role === userRoles.ADMIN ||
          user.role === userRoles.MANAGER ||
          user.actions.includes(userActions.DELETEBILL)
        ) {
          const bill = await Bill.findOne({ billNo: billNo });
          await bill.updateOne({ status: billStatus.DELETED });
          return 'Bill deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteBillPermanently(_, { billNo }, context) {
      //TODO: Apply roles such that one with admin roll can delete
      const user = checkAuth(context);

      try {
        if (user.role === userRoles.ADMIN) {
          const bill = await Bill.findOne({ billNo: billNo });

          await bill.delete();
          return 'Bill deleted permanently';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // async likeBill(_, { billNo }, context) {
    //   const { username } = checkAuth(context);

    //   const bill = await Bill.findById(billNo);
    //   if (bill) {
    //     if (bill.likes.find(like => like.username === username)) {
    //       // Bill already likes, unlike it
    //       bill.likes = bill.likes.filter(like => like.username !== username);
    //     } else {
    //       // Not liked, like bill
    //       bill.likes.push({
    //         username,
    //         createdAt: new Date().toISOString()
    //       });
    //     }

    //     await bill.save();
    //     return bill;
    //   } else throw new UserInputError('Bill not found');
    // }
  },
};

// GENERATING BILL NUMBER
async function genBillNo() {
  const suffix = 'BIL';
  const result = await Bill.find().sort({ billNo: -1 }).limit(1);
  try {
    if (result.length > 0) {
      const lastBillNo = result[0].billNo;
      const trimmed = lastBillNo.substring(3);
      const incremented = (parseInt(trimmed) + 1).toString();
      const newBillNo = `${suffix}${incremented.padStart(6, '0')}`;
      return newBillNo;
    } else {
      return `${suffix}000001`;
    }
  } catch (error) {}
}
