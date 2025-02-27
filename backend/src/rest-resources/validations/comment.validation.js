export const CreateCommentValidation = {
    bodySchema: {
      type: "object",
      properties: {
        description: { type: "string" },
        post_id : {type : "number"},
        },
      required: ["description","post_id"],
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