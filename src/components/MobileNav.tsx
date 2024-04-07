import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import MobileNavLinks from "./MobileNavLinks";
const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <>
              {user?.picture?.length ? (
                <div className="flex flex-col gap-5 items-center">
                  <div className="flex justify-center items-center gap-2  ">
                    <Avatar className="border-orange-500 border-2">
                      <AvatarImage
                        className="animate-pulse"
                        src={user?.picture}
                        alt={user?.name}
                      />
                    </Avatar>
                    <span>{user?.email}</span>
                  </div>
                  <Separator />
                  <MobileNavLinks />
                </div>
              ) : (
                <>
                  <CircleUserRound className="text-orange-500" />
                  <span>{user?.email}</span>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <span>Welcome to Geeats.com</span>
              <Separator />
              <SheetDescription className="flex">
                <Button
                  onClick={() => loginWithRedirect()}
                  className="flex-1 font-bold bg-orange-500"
                >
                  Log In
                </Button>
              </SheetDescription>
            </div>
          )}
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
