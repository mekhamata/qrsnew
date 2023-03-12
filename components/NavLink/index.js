import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ children, ...props }) => {
  const router = useRouter();
  const activeLink =
    props.activeClassName === undefined ||
    props.activeClassName === "" ||
    props.activeClassName === null
      ? props.className
      : props.activeClassName;
  // return props.clickEvent ? (
  //   <a onClick={props.clickEvent}>
  //     <div
  //       className={
  //         router.pathname === props.href || router.asPath === props.href
  //           ? activeLink
  //           : props.className
  //       }
  //       style={{ cursor: 'pointer' }}
  //     >
  //       {props.title}
  //       {children !== undefined && children}
  //     </div>
  //   </a>
  // ) : (
  //   <Link href={props.href} passHref>
  //     <>
  //       <div
  //         className={
  //           router.pathname === props.href || router.asPath === props.href
  //             ? activeLink
  //             : props.className
  //         }
  //         style={{ cursor: 'pointer' }}
  //       >
  //         {props.title && props.title}
  //         {children !== undefined && children}
  //       </div>
  //     </>
  //   </Link>
  // );
  return props.target === "_blank" ? (
    <a
      href={props.href}
      target={props.target}
      rel="noopener noreferrer"
      className={props.aClass && props.aClass !== "" ? props.aClass : ""}
    >
      <div
        className={
          router.pathname === props.href || router.asPath === props.href
            ? activeLink
            : props.className
        }
        style={{ cursor: "pointer" }}
      >
        {props.title}
        {children !== undefined && children}
      </div>
    </a>
  ) : (
    <Link
      href={props.href}
      onClick={props.clickEvent}
      passHref
      target={props.target}
      rel="noopener noreferrer"
    >
      <div
        className={
          router.pathname === props.href || router.asPath === props.href
            ? activeLink
            : props.className
        }
        style={{ cursor: "pointer" }}
      >
        {props.title}
        {children !== undefined && children}
      </div>
    </Link>
  );
};
export default NavLink;
