"use client";

import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Cross1Icon, FilePlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { resolve } from "path";
import { Calendar } from "@/components/ui/calendar";
// import { ko } from "date-fns/locale";

import { DayPicker, NavigationProvider, useNavigation } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  //   file: z.string(),
  file: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: "Your resume must be less than 7MB.",
  }),
});

function FormExample() {
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imageURL, setImageURL] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [fileRenderLoading, setFileRenderLoading] = useState(false);

  //   const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      file: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    toast({
      title: "ㅋㅋ",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  }

  const handleUploadImg = () => {
    fileInputRef.current?.click();
  };

  function getBase64(file: File): Promise<string> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result) {
          res(reader.result.toString());
        }
      };
      reader.onerror = (error) => rej(error);
    });
  }

  const handleRemoveImg = () => {
    form.resetField("file");
    setImageURL("");
  };

  const handleBadgeClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Button type="submit" className="ml-auto flex">
            저장
          </Button>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            유저 기본정보
          </h2>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">이름</FormLabel>
                <FormControl>
                  <Input placeholder="홍길동" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">이메일</FormLabel>
                <FormControl>
                  <Input placeholder="user@email.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            파일
          </h2>

          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col">
                    {/* <div className="flex"> */}
                    <Button
                      className="max-w-32"
                      type="button"
                      onClick={handleUploadImg}
                      disabled={fileRenderLoading}
                    >
                      {fileRenderLoading ? (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          loading...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">파일 업로드</span>
                          <FilePlusIcon className="h-[1.2rem] w-[1.2rem]" />
                        </>
                      )}
                    </Button>
                    <Input
                      {...fieldProps}
                      ref={fileInputRef}
                      className="hidden"
                      placeholder="file"
                      type="file"
                      id="file"
                      multiple={false}
                      accept="image/*, application/pdf"
                      onChange={async (event) => {
                        if (event.target.files) {
                          console.log("여긴감지되는건가?");
                          onChange(event.target.files[0]);
                          setFileRenderLoading(true);
                          const data = await getBase64(event.target.files[0]);
                          console.log("imageRender!");
                          setFileRenderLoading(false);
                          setImageURL(data);
                          event.target.value = "";
                        }
                      }}
                    />
                    {imageURL.length ? (
                      <div className="relative bg-white inline-flex mt-5 sm:w-40 w-full min-h-11">
                        <img
                          src={imageURL}
                          onClick={handleRemoveImg}
                          className="w-full"
                          alt="미리보기 이미지"
                        />

                        <Button
                          className="absolute top-1 right-1"
                          variant="outline"
                          size="icon"
                          type="button"
                          onClick={handleRemoveImg}
                        >
                          <Cross1Icon />
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            달력
          </h2>
        </form>
      </Form>

      <DayPicker
        mode="single"
        className="w-full h-full flex !m-0 z-0"
        classNames={{
          // months: "flex w-full flex-col",
          // table: "w-full",
          // cell: "py-5 px-4 border",
          months:
            "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
          month: "space-y-4 w-full flex flex-col",
          table: "w-full h-full border-collapse space-y-1",
          head_row: "",
          row: "w-full mt-2",
          cell: "py-2 px-2 border",
          // caption: "!z-0",
        }}
        onMonthChange={(val) => setDate(val)}
        locale={ko}
        components={{
          Day: (props) => {
            const select = format(date, "MMM yyy dd", { locale: ko });
            const now = format(props.date, "MMM yyy dd", { locale: ko });
            if (date.getMonth() !== props.date.getMonth()) return <></>;
            return (
              <div
                className="w-full h-full flex flex-col cursor-pointer"
                onClick={() => setDate(props.date)}
              >
                <span className="m-auto text-lg font-semibold">
                  {format(props.date, "d", { locale: ko })}
                </span>
                {/* {select === now ? "선택됨" : ""} */}
                <div className="flex gap-2">
                  <span className="w-1 h-1 bg-red-600 rounded"></span>
                  <span className="w-1 h-1 bg-yellow-600 rounded"></span>
                  <span className="w-1 h-1 bg-green-600 rounded"></span>
                </div>
              </div>
            );
          },
        }}
      />
    </>
  );
}

export default FormExample;
