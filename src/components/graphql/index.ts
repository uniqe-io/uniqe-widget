import { fetchLensProfiles } from "./lens";
import { fetchUniqeProofNFTs } from "./uniqe";
import type { Network } from "./utils";

export { resolveAnyToName, resolveAnyToAddress } from "./ens";
export { fetchLensHandle} from "./lens";

export async function fetchNetworks(address: string): Promise<Network[]> {
  let nfts = await fetchUniqeProofNFTs(address);
  let lenses = await fetchLensProfiles(address);

  return [...nfts, ...lenses];
}
