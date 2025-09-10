// userRoles.ts

export const UserRoles = {
  ADMIN: "ADMIN",
  BUSINESS_OWNER: "BUSINESS_OWNER",
  MANAGER: "MANAGER",
  WAITER: "WAITER",
  COOK: "COOK",
  CUSTOMER: "CUSTOMER",
  ACCOUNTANT: "ACCOUNTANT",
} as const;

// Type derived from the values of UserRoles
export type UserRoles = typeof UserRoles[keyof typeof UserRoles];
