export const CreateLikeValidation = {
    bodySchema: {
      type: "object",
      properties: {
        postId : {type : "number"},
        userId: { type: "number" },
      },
      required: ["postId","userId"],
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