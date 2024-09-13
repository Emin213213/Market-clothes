import { createRoot } from "react-dom/client";
import MainHtml from "./mailHtml";
// import Over from "./App";

import  ProductFilter from './Forma-market/Math'
const bootElement = document.getElementById("boot");
const boot = createRoot(bootElement);
boot.render(<MainHtml />);


