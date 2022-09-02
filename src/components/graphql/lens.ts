import { queryGraphQl, type Network } from "./utils";

interface LensProfile {
    handle: string;
    ownedBy: string;
}

interface LensProfiles {
    items: LensProfile[];
}

interface LensProfilesResponse {
    profiles: LensProfiles;
}

export function lensToNetwork(profile: LensProfile): Network {
    // TODO: Upload empty pic on IPFS
    return {
        validator: "Lens",
        url: `https://lenster.xyz/u/${profile.handle}`,
    };
}

export async function fetchLensHandle(address: string): Promise<string> {
  const query = `
      query($address: [EthereumAddress!]) {
          profiles(request:{ownedBy: $address}) {
              items {
                handle
              }
          }
      }
  `;

  const { profiles } = await queryGraphQl<LensProfilesResponse>(import.meta.env.VITE_LENS_GRAPHQL_URL, query, { address: [address] });

  let  res = profiles?.items?.map(x => x.handle)[0];

  if (res === undefined) {
      throw new Error(`Unable to fetch lens profile: ${address}`);
  }

  return res;
}

export async function fetchLensProfiles(address: string): Promise<Network[]> {
    const query = `
        query($address: [EthereumAddress!]) {
            profiles(request:{ownedBy: $address}) {
                items {
                  handle
                }
            }
        }
    `;

    const { profiles } = await queryGraphQl<LensProfilesResponse>(import.meta.env.VITE_LENS_GRAPHQL_URL, query, { address: [address] });

    let  res = profiles?.items?.map(lensToNetwork);

    if (res === undefined) {
        throw new Error(`Unable to fetch lens profile: ${address}`);
    }

    return res;
}

export async function lookupLensName(handle: string): Promise<string> {
  const query = `
      query($handles: [Handle!]) {
        profiles(request: { handles: $handles}) {
          items {
            handle
            ownedBy
          }
        }
      }
  `;
  console.log(handle)

  const { profiles } = await queryGraphQl<LensProfilesResponse>(import.meta.env.VITE_LENS_GRAPHQL_URL, query, { handles: [handle] });

  let res = profiles?.items[0]?.ownedBy;

  if (res === undefined) {
      throw new Error(`Unable to resolve lens name: ${handle}`);
  }

  return res;
}

