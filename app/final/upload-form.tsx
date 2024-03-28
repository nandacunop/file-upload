"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveFile } from "./action";
import { saveData } from "../basic/action";
import { useTransition } from "react";

export const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, { message: "File is required" }),
});

export function UploadFileForm() {
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // // 3. Optionally, send the form data to your server.
    const formData = new FormData();
    formData.append("file", values.file);

    try {
      saveFile(formData).then((data) => {
        form.reset({ file: undefined });
        alert("Save success!");
      });
    } catch (error) {
      alert("Error: " + error);
    }

    // try {
    //   // saveData(formData);
    //   // form.reset({ file: undefined });
    //   // alert("Save success!");

    //   saveFile(values);
    // } catch (error) {
    //   console.error(error);
    // }
    // startTransition(() => {
    //   saveFile(values).then((data) => {
    //     console.log(data);
    //   });
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <Input
                type="file"
                accept="image/*"
                {...fieldProps}
                onChange={(event) => {
                  onChange(event.target.files && event.target.files[0]);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
