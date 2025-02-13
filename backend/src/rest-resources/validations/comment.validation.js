export const CreateCommentValidation = {
    bodySchema: {
      type: "object",
      properties: {
        description: { type: "string" },
        postId : {type : "number"},
        userId: { type: "number" },
      },
      required: ["description","postId","userId"],
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