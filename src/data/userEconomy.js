const userEconomy = require("../schemas/userEconomy");
const economyTransaction = require("../schemas/economyTransaction");
const {
  dailyAmount,
  dailyCooldownMs,
  transferMax,
} = require("../config/economy");

async function getOrCreateUserEconomy(userId) {
  let doc = await userEconomy.findOne({ userId });
  if (!doc) doc = await userEconomy.create({ userId });
  return doc;
}

async function moveCashToBank(userId, amount) {
  const doc = await getOrCreateUserEconomy(userId);
  if (amount > doc.wallet.cash) throw new Error("insufficientCash");
  doc.wallet.cash -= amount;
  doc.wallet.bank += amount;
  await doc.save();
  await economyTransaction.create({
    type: "deposit",
    userIdFrom: userId,
    userIdTo: userId,
    amount,
  });
  return doc;
}

async function moveBankToCash(userId, amount) {
  const doc = await getOrCreateUserEconomy(userId);
  if (amount > doc.wallet.bank) throw new Error("insufficientBank");
  doc.wallet.bank -= amount;
  doc.wallet.cash += amount;
  await doc.save();
  await economyTransaction.create({
    type: "withdraw",
    userIdFrom: userId,
    userIdTo: userId,
    amount,
  });
  return doc;
}

async function canClaimDaily(userId, now = Date.now()) {
  const doc = await getOrCreateUserEconomy(userId);
  const last = doc.lastDailyAt ? doc.lastDailyAt.getTime() : 0;
  const left = dailyCooldownMs - (now - last);
  return { allowed: left <= 0, waitMs: Math.max(0, left), doc };
}

async function claimDaily(userId, now = Date.now()) {
  const { allowed, waitMs, doc } = await canClaimDaily(userId, now);
  if (!allowed) throw Object.assign(new Error("dailyCooldown"), { waitMs });
  doc.lastDailyAt = new Date(now);
  doc.wallet.cash += dailyAmount;
  await doc.save();
  await economyTransaction.create({
    type: "daily",
    userIdFrom: userId,
    userIdTo: userId,
    amount: dailyAmount,
  });
  return doc;
}

async function transfer(userIdFrom, userIdTo, amount) {
  if (userIdFrom === userIdTo) throw new Error("cannotPaySelf");
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("invalidAmount");
  if (amount > transferMax) throw new Error("overMax");
  const from = await getOrCreateUserEconomy(userIdFrom);
  if (amount > from.wallet.cash) throw new Error("insufficientCash");
  from.wallet.cash -= amount;
  await from.save();
  const to = await getOrCreateUserEconomy(userIdTo);
  to.wallet.cash += amount;
  await to.save();
  await economyTransaction.create({
    type: "transfer",
    userIdFrom,
    userIdTo,
    amount,
  });
  return { from, to };
}

module.exports = {
  getOrCreateUserEconomy,
  moveCashToBank,
  moveBankToCash,
  canClaimDaily,
  claimDaily,
  transfer,
};
