import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CircleUser } from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500-500 gap-2">
        {user?.picture?.length ? (
          <Avatar className="border-orange-500 border-2">
            <AvatarImage
              className="animate-pulse"
              src={user?.picture}
              alt={user?.name}
            />
          </Avatar>
        ) : (
          <CircleUser className="text-orange-500" />
        )}
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-[100px] h-[100px] rounded-sm gap-2 items-center justify-center bg-white">
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
