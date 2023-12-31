type RootLayoutProps = {
  children: React.ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className={'flex min-h-screen flex-col px-24 py-10'}>{children}</main>
  );
}
