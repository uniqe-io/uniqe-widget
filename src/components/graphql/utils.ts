import type BN from "bn.js";

export interface TheGraphResponse<T> {
  data: T;
}

export interface Network {
    icon: string;
    handle: string;
    url: string;
    id: BN;
    validator: string;
    name: string;
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

