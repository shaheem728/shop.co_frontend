import { SignupFormSchema,FormState } from './definition';
import { API_URL } from '@/components/config';

interface User {
  username: string;
  email: string;
  password: string;
  profile: {
    mobile: string;
    address: string;
    order_mobile:string;
  };
}

export async function signup(state: FormState,formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    mobile: formData.get("mobile") || "",
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userData: User = {
    username: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    profile: {
      mobile: formData.get("mobile") as string,
      address:"",
      order_mobile:"",
    },
  };

  try {
    const response = await fetch(`${API_URL}/api/signup/`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      location.href = "/login";
    } else {
      const data = await response.json();
      if(data.username[0]) {
        return { errors: data.username[0] }
      }else{
        return { errors: "user all ready exists" }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: "An unknown error occurred." } };
    }
}
