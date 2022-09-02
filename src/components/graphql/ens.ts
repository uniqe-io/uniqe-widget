import { queryGraphQl } from "./utils";
import { fetchLensHandle, lookupLensName } from "./lens";

interface Domain {
  name: string;
  resolvedAddress: {
      id: string;
  };
}

interface Account {
  id: string;
  domains: Domain[];
}

interface ENSResponseLookupAddress {
  accounts: Array<Account>;
}

interface ENSResponseLookupName {
  domains: Array<Domain>;
}

export async function resolveAnyToAddress(addr: string): Promise<string> {
  if (new RegExp("^0x[A-f0-9]{40}$").test(addr)) {
      return addr;
  }

  if (addr.endsWith(".eth")) {
    return await lookupName(addr);
  }

  if (addr.endsWith(".lens")) {
    return await lookupLensName(addr);
  }

  throw new Error("[No account found]");
}

export async function resolveAnyToName(addr: string): Promise<string> {
  if (new RegExp("^0x[A-f0-9]{40}$").test(addr)) {
    try {
      return await reverseLookupAddress(addr);
    } catch (e) {
      try {
        return await fetchLensHandle(addr);
      } catch (e) {}
    }
  }

  if (addr.endsWith(".eth")) {
    return addr;
  }

  if (addr.endsWith(".lens")) {
    return addr;
  }

  return `0x${addr.slice(2, 10).toUpperCase()}`
}

async function reverseLookupAddress(addr: string): Promise<string> {
  const query = `
  query($addr: String!) {
    accounts(where: { id: $addr}) {
      domains {
        name
      }
    }
  }
  `;

  const data = await queryGraphQl<ENSResponseLookupAddress>(import.meta.env.VITE_ENS_GRAPHQL_URL as string, query, { addr: addr.toLocaleLowerCase() });
  let res = data?.accounts[0]?.domains[0]?.name;

  if (res === undefined) {
      throw new Error(`Unable to resolve address: ${addr}`);
  }

  return res;
}

async function lookupName(name: string): Promise<string> {
  const query = `
  query($name: String!) {
      domains(where:{name: $name}) {
          resolvedAddress {
              id
          }
      }
  }
  `;

  const data = await queryGraphQl<ENSResponseLookupName>(import.meta.env.VITE_ENS_GRAPHQL_URL as string, query, { name: name.toLocaleLowerCase() });
  let res = data?.domains[0]?.resolvedAddress?.id;
  if (res === undefined) {
      throw new Error(`Unable to resolve name: ${name}`);
  }

  return res;
}
