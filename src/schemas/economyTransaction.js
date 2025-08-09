const { Schema, model, models } = require("mongoose");

const economyTransactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["daily", "deposit", "withdraw", "transfer"],
      required: true,
    },
    userIdFrom: { type: String, default: null },
    userIdTo: { type: String, default: null },
    amount: { type: Number, required: true, min: 1 },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

economyTransactionSchema.index({ createdAt: -1 });
economyTransactionSchema.index({ userIdFrom: 1, createdAt: -1 });
economyTransactionSchema.index({ userIdTo: 1, createdAt: -1 });

module.exports =
  models.economyTransaction ||
  model("economyTransaction", economyTransactionSchema);
