import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faLaptop,
  faMinus,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";

export default function () {
  library.add(
    faLaptop,
    faFacebookSquare,
    faTwitterSquare,
    faInstagramSquare,
    faYoutubeSquare,
    faChevronLeft,
    faSortUp,
    faSortDown,
    faMinus
  );
}
