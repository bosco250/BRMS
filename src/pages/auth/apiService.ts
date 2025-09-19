const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
  throw new Error("Backend URL is not defined in environment variables.");
}
//login user
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}

//register user
export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: string;
}) {
  const [first_name, ...lastNameParts] = userData.name.trim().split(" ");
  const last_name = lastNameParts.join(" ") || "";

  const roleMap: Record<string, string> = {
    customer: "CUSTOMER",
    business: "BUSINESS_OWNER",
  };

  const requestData = {
    first_name,
    last_name,
    email: userData.email,
    password: userData.password,
    phone_num: userData.phone,
    roleName: roleMap[userData.userType] || "CUSTOMER",
  };

  const response = await fetch(`${backendUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
}
