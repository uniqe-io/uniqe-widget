import { queryGraphQl } from "./utils";

interface Domain {
  id: string;
  resolvedAddress: {
      id: string;
  };
}

interface ENSResponse {
  domains: Domain[];
}

export async function resolveNameOrAddress(url: string, addr: string): Promise<string> {
  if (new RegExp("^0x[A-f0-9]{40}$").test(addr)) {
      return addr;
  }

  if (!addr.endsWith(".eth")) {
      addr = `${addr}.eth`;
  }

  const query = `
  query($addr: String!) {
      domains(where:{name: $addr}) {
          id
          resolvedAddress {
              id
          }
      }
  }
  `;

  const data = await queryGraphQl<ENSResponse>(url, query, { addr });

  if (!data || !data.domains || data.domains.length === 0) {
      throw new Error(`Unable to resolve address: ${addr}`);
  }

  return data.domains[0].resolvedAddress.id;

}
