import Header from "./header/header";
import Footer from "./footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div dir={router.locale === "he" ? "rtl" : "ltr"}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
