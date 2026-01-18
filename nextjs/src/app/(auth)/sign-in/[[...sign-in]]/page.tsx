import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <SignIn

      fallbackRedirectUrl={"/standalone/welcome"}

      signUpForceRedirectUrl={"/standalone/welcome"}
    />
  );
}
