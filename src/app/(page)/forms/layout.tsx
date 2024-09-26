import React from "react";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    // <DayPickerProvider
    //   initialProps={{
    //     locale: ko,
    //     mode: "single", // 또는 'multiple', 'range' 등
    //     month: new Date(), // 초기 월 설정
    //   }}
    // >
    //   <NavigationProvider>{children}</NavigationProvider>
    // </DayPickerProvider>
    <>{children}</>
  );
}

export default Layout;
