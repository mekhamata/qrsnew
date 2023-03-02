import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far, fab);
const IconComponent = (props) => {
  return (
    <FontAwesomeIcon
      icon={`${[props.name]}`}
      className={props.className ? props.className : "socialIcons"}
    />
  );
};
export default IconComponent;
