import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SignInButton, UserButton } from "@clerk/nextjs";


export default function Home() {
  return (<>
  <SignInButton/>
  <UserButton/>
  <ThemeToggle/>
  
  </>
  );
}
