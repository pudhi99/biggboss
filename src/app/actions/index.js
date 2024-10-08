"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/dashboard" });
}

export async function logout() {
  try {
    const response = await signOut();
    console.log(response, "logout");

    return response;
  } catch (err) {
    throw err;
  }
}

export async function doCredentialLogin(formData) {
  // console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (err) {
    throw err;
  }
}
