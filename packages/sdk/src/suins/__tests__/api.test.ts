import { resolveAddressToSuiNSNames } from "../api";
import { SuiClient } from "@mysten/sui/client";

const getMockedSuiClient = (): SuiClient => {
  return {
    call: jest.fn().mockResolvedValue({
      data: ["alice.sui", "alice-backup.sui"]
    }),
  } as any;
};

const getMockedSuiClientEmpty = (): SuiClient => {
  return {
    call: jest.fn().mockResolvedValue({
      data: []
    }),
  } as any;
};

describe("resolveAddressToSuiNSNames", () => {
  test("should return SuiNS names when address has names", async () => {
    const suiClient = getMockedSuiClient();
    const names = await resolveAddressToSuiNSNames(suiClient, "0x123");
    expect(names).toEqual(["alice.sui", "alice-backup.sui"]);
    expect(suiClient.call).toHaveBeenCalledWith('suix_resolveNameServiceNames', [
      "0x123"
    ]);
  });

  test("should return empty array when address has no names", async () => {
    const suiClient = getMockedSuiClientEmpty();
    const names = await resolveAddressToSuiNSNames(suiClient, "0x456");
    expect(names).toEqual([]);
  });

  test("should return empty array on API error", async () => {
    const suiClient = { call: jest.fn().mockRejectedValue(new Error("Network error")) } as any;
    const names = await resolveAddressToSuiNSNames(suiClient, "0x789");
    expect(names).toEqual([]);
  });
});
