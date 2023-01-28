export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/dashboard", "/profile", "/addathlete", "/women", "/men"],
  matcher: ["/admin/:path*"],
};
