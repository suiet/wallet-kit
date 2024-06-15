import { AccountObjectManager } from "../AccountObjectManager";
import type { PaginatedCoins } from "@mysten/sui/client";
import { AccountCoinManager } from "../AccountCoinManager";

const mockedGetCoinsResponse: PaginatedCoins = {
  data: [
    {
      coinType: "0x2::sui::SUI",
      coinObjectId:
        "0x6126323fa428acc1c2b677f919f4655662368e8ad98e4521888850ae30bc2ba0",
      version: "33568269",
      digest: "JChftws27HWvj63FVWxV2aSHer1PHg8qBjE9TA3sL7qP",
      balance: "20000000",
      previousTransaction: "2V2yEajjuwMfPP1JokKdznDQX9b5mAwonNsdB3sstk4R",
    },
  ],
  nextCursor:
    "0x6126323fa428acc1c2b677f919f4655662368e8ad98e4521888850ae30bc2ba0",
  hasNextPage: false,
};

const mockedGetBalanceResponse = {
  coinType: "0x2::sui::SUI",
  coinObjectCount: 1,
  totalBalance: "144521165343",
  lockedBalance: {},
};

const getMockedSuiClient = jest.fn().mockImplementation(() => {
  return {
    getCoins: jest.fn().mockReturnValue(mockedGetCoinsResponse),
    getBalance: jest.fn().mockReturnValue(mockedGetBalanceResponse),
  };
});

describe("test getCoins", () => {
  test("given mocked sdk, when getCoins, then return coins of that type", async () => {
    const objManager = new AccountCoinManager(
      getMockedSuiClient(),
      "0x2::sui::SUI"
    );
    const coins = await objManager.getOwnedCoins("0x123");
    expect(coins.length).toEqual(1);
    expect(coins[0].objectId).toEqual(
      "0x6126323fa428acc1c2b677f919f4655662368e8ad98e4521888850ae30bc2ba0"
    );
  });
});

describe("test getBalance", () => {
  test("given mocked sdk, when getBalance, then return balance of that type of coin", async () => {
    const objManager = new AccountCoinManager(
      getMockedSuiClient(),
      "0x2::sui::SUI"
    );
    const balance = await objManager.getBalance("0x123");
    expect(balance).toEqual(144521165343n);
  });
});
