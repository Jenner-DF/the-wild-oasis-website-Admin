import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("cannot fetch data from cabins:", error);
  // console.log(data);
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("cabin could not be deleted.", error);
  console.log(data);
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); //supabase img
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image //using the existing path (already in supabase)
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. create cabin
  let query = supabase.from("cabins");
  query = id
    ? query.update({ ...newCabin, image: imagePath }).eq("id", id) // EDIT
    : query.insert([{ ...newCabin, image: imagePath }]); // CREATE
  const { data, error } = await query.select().single();

  if (error) throw new Error("cabin could not be created.", error);
  //2. upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) throw new Error("cabin could not be created.", error);
  //3. delete cabin if error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
