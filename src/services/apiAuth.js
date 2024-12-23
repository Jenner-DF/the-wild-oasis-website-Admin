import supabase, { supabaseUrl } from "./supabase";
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error);
  return data;
}
export async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message);

  if (!session.session) return null;
  // Explicitly refresh user data
  const { data, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);
  return data; // Return the full user object
}
export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error);
}
export async function signUp({ email, password, fullName }) {
  console.log(email);

  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });
  // let { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: "google",
  // });
  if (error) throw new Error(error);
  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  console.log(password, fullName, avatar);
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  console.log("updatedated data", updateData);
  //1. update password or full name
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  //2. upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);
  //3. update avatar in user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  console.log(updatedUser);
  return updatedUser;
}
