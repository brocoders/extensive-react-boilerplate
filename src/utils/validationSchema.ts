export const emailSchema = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
};

export const passwordSchema = {
  required: "Password is required",
  minLength: { value: 8, message: "Password must be at least 8 characters" },
};

export const firstNameSchema = {
  required: "First name is required",
  pattern: { value: /^[a-zA-Z\s]+$/, message: "Invalid first name" },
};

export const lastNameSchema = {
  required: "Last name is required",
  pattern: { value: /^[a-zA-Z\s]+$/, message: "Invalid last name" },
};

export const phoneSchema = {
  required: "Phone number is required",
  pattern: { value: /^[0-9()-.\s]{7,15}$/, message: "Invalid phone number" },
};

export const otpSchema = {
  required: "OTP is required",
  minLength: { value: 6, message: "OTP must be exactly 6 characters" },
};
