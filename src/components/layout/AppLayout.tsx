import type React from "react";

type AppLayoutProps = {
  children: React.ReactNode;
};
export function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return <>{children}</>;
}
