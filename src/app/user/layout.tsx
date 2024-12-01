import React from "react";
import ClientLayout from "./UserClientLayout"; 

export const metadata = {
  title: "User Dashboard",
  description: "This is a layout specific to the /user pages",
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      {children} {/* クライアントレイアウト内に子コンポーネントを表示 */}
    </ClientLayout>
  );
}