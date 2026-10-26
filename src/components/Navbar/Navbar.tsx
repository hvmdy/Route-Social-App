import { Button, Dropdown, Label, Tabs } from "@heroui/react";
import logo from "../../assets/route.png";
import {
  House,
  MessageCircle,
  Settings,
  TextAlignJustify,
  User,
} from "lucide-react";
import { useToken } from "../Context/TokenContext";
import { Link } from "react-router";
import { useUserContext } from "../Context/userContext";
export default function Navbar() {
  const { setToken } = useToken();
  const { userDetails } = useUserContext();
  function logout(): void {
    localStorage.removeItem("userToken");
    setToken(null);
  }
  return (
    <>
      <nav className="border-b border-slate-200 sticky top-0 z-40 bg-white">
        <div className="container mx-auto flex justify-between items-center gap-2 px-2 py-1.5 sm:gap-3 sm:px-3 ">
          <div className="nav-logo flex justify-center items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="h-9 w-9 rounded-xl object-cover"
            />
            <p className="text-lg font-extrabold text-slate-900 sm:block hidden">
              Route Posts
            </p>
          </div>
          <div className="nav-link ">
            <Tabs className="w-full max-w-md ">
              <Tabs.ListContainer className="border border-slate-200 rounded-2xl bg-sec">
                <Tabs.List aria-label="Options">
                  <Tabs.Tab id="feed" className="flex gap-2">
                    <House size={20} />
                    <Link to={"/feed"}>
                      <p className="sm:inline hidden">Feed</p>
                    </Link>
                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab id="profile" className="flex gap-2">
                    <User size={20} />
                    <Link to={"/profile"}>
                      <p className="sm:inline hidden">Profile</p>
                    </Link>
                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab id="notification" className="flex gap-2">
                    <MessageCircle size={20} />
                    <Link to={"/notification"}>
                      <p className="sm:inline hidden">Notification</p>
                    </Link>
                    <Tabs.Indicator />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>
          <div className="nav-actions">
            <Dropdown>
              <Button
                aria-label="Menu"
                variant="secondary"
                className="flex gap-2 justify-between items-center text-slate-800"
              >
                <div className="w-7 h-7">
                  <img
                    src={userDetails?.photo}
                    alt={userDetails?.name}
                    className="rounded-full w-full"
                  />
                </div>
                <p className="sm:inline hidden">{userDetails?.name}</p>
                <TextAlignJustify size={16} />
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => console.log(`Selected: ${key}`)}
                >
                  <Dropdown.Item id="profile" textValue="profile">
                    <User size={16} />
                    <Label>Profile</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="settings" textValue="settings">
                    <Settings size={16} />
                    <Label>Settings</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="logout"
                    textValue="logout"
                    variant="danger"
                    onClick={logout}
                  >
                    <Label>Logout</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
}
