import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center my-36">
      <SignUp path="/sign-up" />
    </div>
  );
}
