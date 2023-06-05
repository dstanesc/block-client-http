import axios, { AxiosInstance, AxiosResponse } from "axios";

interface Block {
  cid: string;
  bytes: Uint8Array;
}

export class BlockClient {
  private httpClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.httpClient = axios.create({
      baseURL: baseUrl,
    });
  }

  public async storeBlock(cid: string, bytes: Uint8Array): Promise<void> {
    await this.httpClient.put("/", bytes, {
      params: {
        cid: cid,
      },
      headers: {
        "Content-Type": "application/octet-stream",
      },
      data: bytes,
    });
  }

  public async retrieveBlock(cid: string): Promise<Block | null> {
    const response: AxiosResponse<ArrayBuffer> = await this.httpClient.get(
      "/",
      {
        responseType: "arraybuffer",
        params: {
          cid: cid,
        },
      }
    );
    if (response.data) {
      const block: Block = {
        cid: cid,
        bytes: new Uint8Array(response.data),
      };

      return block;
    }

    return null;
  }

  public async resolveBlockName(name: string): Promise<string | null> {
    const response: AxiosResponse<string> = await this.httpClient.get(
      "/resolve",
      {
        params: {
          name: name,
        },
      }
    );

    if (response.data) {
      return response.data;
    }

    return null;
  }

  public async updateBlockName(name: string, cid: any): Promise<void> {
    await this.httpClient.put(
      "/update",
      {},
      {
        params: {
          name: name,
          cid: cid,
        },
      }
    );
  }
}
