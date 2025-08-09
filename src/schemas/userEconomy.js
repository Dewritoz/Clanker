const { Schema, model, models } = require("mongoose");

const walletSchema = new Schema(
  {
    cash: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
  },
  { _id: false }
);

const userEconomySchema = new Schema(
  {
    userId: { type: String, unique: true, required: true },
    wallet: { type: walletSchema, default: () => ({}) },
    lastDailyAt: { type: Date, default: null },
    lastWorkAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = models.userEconomy || model("userEconomy", userEconomySchema);
