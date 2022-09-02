export interface TheGraphResponse<T> {
  data: T;
}

export interface Network {
    url: string;
    validator: string;
}

export async function displayAddress(walletOrName: string): Promise<string> {
    if (new RegExp("^0x[A-f0-9]{40}$").test(walletOrName)) {
        return walletOrName;
    }

    return walletOrName;

}

export async function queryGraphQl<T>(uri: string, query: string, variables: { [name: string]: any }): Promise<T> {
  const res = await fetch(uri, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables })
  });

  const { data } = await res.json() as TheGraphResponse<T>;

  return data;
}

