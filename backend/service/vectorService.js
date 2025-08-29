const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const aiChatAppIndex = pc.Index("ai-chat-app");

async function createMemory({ vectors, metadata, messageId }) {
  await aiChatAppIndex.upsert([
    {
      id: messageId,
      values: vectors,
      metadata,
    },
  ]);
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
  const data = await aiChatAppIndex.query({
    vector: queryVector,
    topK: limit,
    filter: metadata ? metadata : undefined,
    includeMetadata: true,
  });

  return data.matches;
}

module.exports = {
  createMemory,
  queryMemory,
};
