const moment = require('moment');

const Item = require('../../models/Item');
const checkAuth = require('../../util/check-auth');
const { userRoles } = require('../../util/rolesAndActions');
const { userActions } = require('../../util/rolesAndActions');

module.exports = {
  Query: {
    async getItems() {
      try {
        const items = await Item.find({
          isActive: 'Y',
        }).sort({
          createdAt: -1,
        });
        return items;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getItem(_, { itemCode }) {
      try {
        const item = await Item.findOne({ itemCode: itemCode });
        if (item) {
          return item;
        } else {
          throw new Error('Item not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createItem(parent, { input }, context) {
      const user = checkAuth(context);
      // changing the sent values to an "object"
      const { name, desc } = JSON.parse(JSON.stringify(input));

      // 1st generate itemCode
      const itemCode = await genItemCode();
      // making sure itemCode is generated otherwise dont save anything
      if (!itemCode) {
        throw new Error('Error creating Item');
      }
      // MAKING SURE WE ONLY SAVE AN ITEM WITH NAME
      if (!name) {
        throw new Error(`Error creating item, no name given`);
      } else {
        try {
          // Now generate Item instance with its items
          const newItem = new Item({
            itemCode,
            name,
            desc,
            label: name,
            value: name,
            user: user.id,
            createdAt: moment().format(),
          });
          // Now save item details
          const item = await newItem.save();

          return item;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    async deleteItem(_, { itemCode }, context) {
      const user = checkAuth(context);

      try {
        if (
          user.role === userRoles.ADMIN ||
          user.role === userRoles.MANAGER ||
          user.actions.includes(userActions.DELETEITEM)
        ) {
          const item = await Item.findOne({ itemCode: itemCode });
          await item.updateOne({ isActive: 'N' });
          return 'Item deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteBillPermanently(_, { itemCode }, context) {
      //TODO: Apply roles such that one with admin roll can delete permanently
      const user = checkAuth(context);

      try {
        if (user.role === userRoles.ADMIN) {
          const item = await Item.findOne({ itemCode: itemCode });

          await item.delete();
          return 'Item deleted permanently';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

// GENERATING ITEMCODE
async function genItemCode() {
  const suffix = 'ITM';
  const result = await Item.find().sort({ itemCode: -1 }).limit(1);
  try {
    if (result.length > 0) {
      const lastItemCode = result[0].itemCode;
      const trimmed = lastItemCode.substring(3);
      const incremented = (parseInt(trimmed) + 1).toString();
      const newItemCode = `${suffix}${incremented.padStart(6, '0')}`;
      return newItemCode;
    } else {
      return `${suffix}000001`;
    }
  } catch (error) {}
}
