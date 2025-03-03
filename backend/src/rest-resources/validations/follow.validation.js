export const CreateFollowValidation = {
    bodySchema: {
      type: "object",
      properties: {
        follower_id : {type : "number"},
        },
      required: ['follower_id'],
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

