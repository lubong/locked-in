// app/page.tsx or app/page.js
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/login"); // Redirect from / to /home
  return null; // Return null because the redirect will happen instantly
}
