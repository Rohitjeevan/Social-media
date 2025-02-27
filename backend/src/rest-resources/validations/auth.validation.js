export const loginValidation = {
  bodySchema: {
    type: "object",
    properties: {
      password: {
        type: "string",
        minLength: 8,
      },
      email: { type: "string" },
    },
    required: ["email", "password"],
  },
  responseSchema: {
    default: {
      type: "object",
      properties: {
        token: { type: "string" },
        user: { type: "object" },
      },
      required: ["token", "user"],
    },
  },
};

export const logoutValidation = {
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

export const newPasswordValidation = {
  bodySchema: {
    type: "object",
    properties: {
      email: { type: "string" },
    },
    required: ["email"],
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

export const resetPasswordValidation = {
  bodySchema: {
    type: "object",
    properties: {
      old_password: {
        type: "string",
        minLength: 8,
      },
      new_password: {
        type: "string",
        minLength: 8,
      },
    },
    required: ["old_password", "new_password"],
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
