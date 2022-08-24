import { queryGraphQl, type Network } from "./utils";
import { BN } from "bn.js"
import { resolveNameOrAddress } from "./ens";

interface TokenMetadataAttribute {
  trait_type: string;
  value: any;
}

interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes: TokenMetadataAttribute[];
}


interface UniqeProof {
  id: string;
  tokenURI: string
}

interface UNIQResponse {
  uniqeProofs: UniqeProof[];
}

function proofToNetwork(proof: UniqeProof): Network {
  const tokenMetadataString = atob(proof.tokenURI.replace("data:application/json;base64,", ""));
  const tokenMetadata = JSON.parse(tokenMetadataString) as unknown as TokenMetadata;

  const handle = tokenMetadata.attributes.filter(e => e.trait_type === "handle")[0].value;
  const url = tokenMetadata.attributes.filter(e => e.trait_type === "url")[0].value;
  const validator = tokenMetadata.attributes.filter(e => e.trait_type === "validator")[0].value as string;
  const proxiedIcon = `${import.meta.env.VITE_IPFS_GATEWAY}${tokenMetadata.image}`;

  return {
      id: new BN(proof.id),
      name: tokenMetadata.name,
      icon: proxiedIcon,
      url,
      handle,
      validator,
  };
}

export async function fetchUniqeProofNFTs(nameOrAddress: string): Promise<Network[]> {
  const url = import.meta.env.VITE_UNIQE_GRAPH as string;

  const query = `
  query($addr: String!) {
      uniqeProofs(where: { owner: $addr }) {
          id
          tokenURI
      }
  }
  `;

  const addr = await resolveNameOrAddress(url, nameOrAddress);
  const { uniqeProofs } = await queryGraphQl<UNIQResponse>(url, query, { addr });

  let networks: Network[] = [];
  for (const proof of uniqeProofs) {
    try {
      networks.push(proofToNetwork(proof));
    } catch (e) {
      console.log(e);
    }
  }

  return networks;
}
