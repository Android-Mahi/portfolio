import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, app-wide. Importing from this module guarantees the plugin
// is available wherever GSAP scroll animations are used.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
