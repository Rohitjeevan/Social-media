export const PostValidation = {
  bodySchema: {
    type: "object",
    properties: {
      description: { type: "string" },
      location: { type: "string" },
      image_url: { type: "string" }
    },
    required: ["description","location"],
  },
  responseSchema: {
    default: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
  },
};

export const getPostValidation = {
  querySchema: {
    type: "object",
    properties: {},
  },
  responseSchema: {
    default: {
      type: "object",
      properties: {
        posts: { type: "array" },
      },
    },
  },
};

export const getByIdValidation = {
  paramSchema: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
  responseSchema: {
    default: {
      type: "object",
      properties: {
        post: { type: "object" },
      },
    },
  },
};
