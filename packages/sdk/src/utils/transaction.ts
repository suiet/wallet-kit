import { Transaction } from "@mysten/sui/transactions";
import { KitError } from "../error-handling";

export async function serializeTransaction(transaction: any) {
  if (!transaction) {
    throw new KitError("Cannot serialize empty transaction");
  }
  if (typeof transaction === "string") {
    return transaction;
  }
  if ("toJSON" in transaction) {
    return await transaction.toJSON();
  }
  if ("serialize" in transaction) {
    return transaction.serialize();
  }
  throw new KitError(
    'Cannot serialize transaction, missing "toJSON" or "serialize" method'
  );
}

export async function normalizeTransaction(transaction: any) {
  return Transaction.from(await serializeTransaction(transaction));
}
