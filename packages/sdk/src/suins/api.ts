import { SuiClient } from "@mysten/sui/client";

export async function resolveAddressToSuiNSNames(
  suiClient: SuiClient,
  address: string
): Promise<string[]> {
  try {
    const response = await suiClient.call('suix_resolveNameServiceNames', [
      address
    ]);
    return (response as any)?.data || [];
  } catch (error) {
    console.warn('Failed to resolve SuiNS names for address:', address, error);
    return [];
  }
}
