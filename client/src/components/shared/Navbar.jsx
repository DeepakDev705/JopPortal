import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setAuthuser } from "@/redux/authslice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthuser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Navigation and Avatar */}
        <div className="flex items-center gap-12">
          {/* Navigation Menu */}
          <ul className="flex font-medium items-center gap-10">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Conditional Rendering: Login/Signup or User Avatar */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/Login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/Signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  {" "}
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-10 h-10 rounded-full border border-gray-300 shadow-lg">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-3 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="flex flex-col gap-4">
                  {/* User Information */}
                  <div className="flex items-center gap-3">
                    <Avatar className="cursor-pointer w-12 h-12 rounded-full border border-gray-300 shadow-lg">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
