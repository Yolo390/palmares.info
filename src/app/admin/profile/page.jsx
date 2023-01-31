import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import ProfileForm from "@/components/admin/form/Profile";

const getUserById = async (id) => {
  const res = await fetch(
    `http://localhost:3000/api/admin/profile/getUserById?id=${id}`
  );

  const data = await res.json();

  return data.user;
};

const Profile = async () => {
  const session = await getServerSession(authOptions);

  // To edit user session, there is no official way to do it w/ jwt...
  // See: https://github.com/nextauthjs/next-auth/issues/2269
  // See: https://github.com/nextauthjs/next-auth/issues/596
  // That's why I fetch user from DB through API.
  const user = await getUserById(session.user.id);

  return <ProfileForm user={user} />;
};

export default Profile;
