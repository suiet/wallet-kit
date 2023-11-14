import { AccountObjectManager } from "../AccountObjectManager";
import { PaginatedObjectsResponse } from "@mysten/sui.js/client";

const mockedResponse: PaginatedObjectsResponse = {
  data: [
    {
      data: {
        objectId:
          "0x6126323fa428acc1c2b677f919f4655662368e8ad98e4521888850ae30bc2ba0",
        version: "33568269",
        digest: "JChftws27HWvj63FVWxV2aSHer1PHg8qBjE9TA3sL7qP",
        type: "0x2::coin::Coin<0x2::sui::SUI>",
        owner: {
          AddressOwner:
            "0x50653db2ffbf43bb4eb2994da699cdebcc47d9c0c419c36bc0bc9fb16067ce80",
        },
        display: {
          data: null,
          error: null,
        },
        content: {
          dataType: "moveObject",
          type: "0x2::coin::Coin<0x2::sui::SUI>",
          hasPublicTransfer: true,
          fields: {
            balance: "20000000",
            id: {
              id: "0x6126323fa428acc1c2b677f919f4655662368e8ad98e4521888850ae30bc2ba0",
            },
          },
        },
      },
    },
  ],
  nextCursor:
    "0x6126323fa428acc1c2b677f919f4655662368e8ad98e4521888850ae30bc2ba0",
  hasNextPage: false,
};

const getMockedSuiClient = jest.fn().mockImplementation(() => {
  return {
    getOwnedObjects: jest.fn().mockReturnValue(mockedResponse),
  };
});

describe("test getOwnedObjects", () => {
  test("given mocked sdk, when getOwnedObjects, then return objects", async () => {
    const objManager = new AccountObjectManager(getMockedSuiClient());
    const objects = await objManager.getOwnedObjects("0x123");
    expect(objects.length).toBe(1);
    expect(objects).toEqual(mockedResponse.data.map((item) => item.data));
  });
});
