"use server";

import { z } from "zod";
import { formSchema } from "./default-form";

import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

export const uploadThis = async (values: z.infer<typeof formSchema>) => {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password, image } = validatedFields.data;

  console.log("username: " + username);
  console.log("password: " + password);
  console.log("file: " + image.name);

  return { success: "Success!" };
};

export async function uploadData(file: File) {
  // const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();
  const filePath = path.join(
    `D:/yogiyendri/LEARNING/upload-file/public/${file.name}`
  );
  await writeFile(filePath, Buffer.from(fileBuffer));

  const url = `http://localhost:3000/${file.name}`;

  return url;
}
