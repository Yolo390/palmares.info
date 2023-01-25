import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const BottomNavbar = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="Dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="Profile">Profile</TabsTrigger>
        <TabsTrigger value="Logout">Sign out</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default BottomNavbar;
