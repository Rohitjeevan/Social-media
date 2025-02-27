export const createValidation = {
  bodySchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
        pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
      },
      password: {
        type: "string",
        minLength: 8,
        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
      },
      email: { type: "string" },
      age: { type: "number" },
      city: { type: "string" },
      eligible: { type: "boolean" },
      dob: { type: "string", format: "date" },
      mobile: { type: "string" },
      private_account: { type: "boolean" },
      gender: { type: "string" },
    },
    required: [
      "name",
      "password",
      "email",
      "age",
      "city",
      "eligible",
      "dob",
      "mobile",
      "private_account",
      "gender",
    ],
  },
  responseSchema: {
    default: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const getValidation = {
  querySchema: {
    type: "object",
    properties: {},
  },
  responseSchema: {
    default: {
      type: "object",
      properties: {
        users: { type: "array" },
      },
    },
  },
};
