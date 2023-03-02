export const useWidth = () => {
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  return width;
};
export const whatLanguage = (lang, obj, value) => {
  if (lang === "en") {
    if (obj && obj[value + "_en"] !== "" && obj[value + "_en"] !== null) {
      return obj[value + "_en"];
    } else {
      return obj[value];
    }
  } else {
    return obj[value];
  }
};
