"use server";

import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

export async function saveFile(formData: FormData) {
  const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();
  const filePath = path.join(
    `D:/yogiyendri/LEARNING/upload-file/public/${file.name}`
  );
  await writeFile(filePath, Buffer.from(fileBuffer));

  const payload = {
    email: formData.get("email"),
  };

  console.log("payload", payload);

  return payload;
}
