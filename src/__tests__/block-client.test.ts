import { BlockClient } from "../index";

const client = new BlockClient("http://localhost:3000");

describe("BlockClient", () => {
  describe("updateBlockName", () => {
    it("should update the name of a block with the given CID", async () => {
      const cid = "QmV5kz2FJNpGk7U2qL7v6QbC5w5VQcCv8YsZmUH5y1Ux";
      const name = "example.com";
      await client.updateBlockName(name, cid);
      const resolvedCid = await client.resolveBlockName(name);
      expect(resolvedCid).toBe(cid);
    });
  });

  describe("storeBlock", () => {
    it("should store a block with the given CID and bytes", async () => {
      const cid = "QmV5kz2FJNpGk7U2qL7v6QbC5w5VQcCv8YsZmUH5y1Ux";
      const bytes = new TextEncoder().encode("hello world");
      await client.storeBlock(cid, bytes);
    });
  });

  describe("retrieveBlock", () => {
    it("should retrieve a block with the given CID", async () => {
      const cid = "QmV5kz2FJNpGk7U2qL7v6QbC5w5VQcCv8YsZmUH5y1Ux";
      const block = await client.retrieveBlock(cid);
      expect(block).not.toBeNull();
      const expected = new TextEncoder().encode("hello world");
      expect(block.bytes).toStrictEqual(expected);
      expect(block.cid).toStrictEqual(cid);
    });
  });

  describe("resolveBlockName", () => {
    it("should resolve a block name to a CID", async () => {
      const name = "example.com";
      const cid = await client.resolveBlockName(name);
      expect(cid).not.toBeNull();
      expect(cid).toStrictEqual("QmV5kz2FJNpGk7U2qL7v6QbC5w5VQcCv8YsZmUH5y1Ux");
    });
  });
});
