export const CreateLikeValidation = {
    bodySchema: {
      type: "object",
      properties: {
        post_id : {type : "number"},
      },
      required: ['post_id'],
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


export const DisLikeValidation = {
    bodySchema: {
      type: "object",
      properties: {
        post_id : {type : "number"},
      },
      required: ['post_id'],
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