import { queryGraphQl, type Network } from "./utils";

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

  const url = tokenMetadata.attributes.filter(e => e.trait_type === "url")[0].value;
  const validator = tokenMetadata.attributes.filter(e => e.trait_type === "validator")[0].value as string;

  return {
      url,
      validator,
  };
}

export async function fetchUniqeProofNFTs(address: string): Promise<Network[]> {
  const query = `
  query($addr: String!) {
      uniqeProofs(where: { owner: $addr }) {
          id
          tokenURI
      }
  }
  `;

  const { uniqeProofs } = await queryGraphQl<UNIQResponse>(import.meta.env.VITE_UNIQE_GRAPHQL_URL , query, { addr: address });

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
