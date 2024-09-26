"use client";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

interface IErrorCode {
  default: () => void;
  401: () => void;
  403: () => void;
  409: () => void;
  500: () => void;
}

function useApiError() {
  const router = useRouter();

  const { toast } = useToast();

  const handleError = (error: Error) => {
    const status = (error.cause as { code?: "default" | 401 | 403 | 409 | 500 })
      ?.code;
    const message = error.message;
    toast({
      variant: "destructive",
      title: message,
      description: "There was a problem with your request.",
    });

    const defaultHandler = () => {
      // router.replace("/auth/sign-in");
      // console.log(httpMessage);
      // toast.error(httpMessage ? httpMessage : "Network response was not ok");
    };

    const handler401 = () => {
      router.replace("/auth/sign-in");
      // toast({
      //   variant: "destructive",
      //   title: "401",
      //   description: "There was a problem with your request.",
      // });
    };

    const handler403 = () => {
      router.replace("/auth/sign-in");
      // toast({
      //   variant: "destructive",
      //   title: "403",
      //   description: "There was a problem with your request.",
      // });
    };

    const handler409 = () => {
      console.log("409 Error");
    };

    const handler500 = () => {
      console.log("서버에서 알 수 없는 문제가 발생하였습니다.");
    };

    const handlers: IErrorCode = {
      default: defaultHandler,
      401: handler401,
      403: handler403,
      409: handler409,
      500: handler500,
    };

    if (status && handlers[status]) {
      return handlers[status]();
    }
    // handlers.default(error.message);
  };

  return { handleError };
}

export default useApiError;
