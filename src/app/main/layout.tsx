import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full ">
          <Header></Header>
          {children}
        </div>
      </div>
    </>
  );
}
