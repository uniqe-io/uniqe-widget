import { fetchLensProfiles } from "./lens";
import { fetchUniqeProofNFTs } from "./uniqe";
export { resolveAnyToName, resolveAnyToAddress } from "./ens";
import type { Network } from "./utils";

export async function fetchNetworks(address: string): Promise<Network[]> {
  let nfts = await fetchUniqeProofNFTs(address);
  let lenses = await fetchLensProfiles(address);

  return [...nfts, ...lenses];
}
