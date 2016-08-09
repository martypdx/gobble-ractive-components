import Ractive from "ractive";
import C0 from "./component-one";
import C1 from "./nested-component";
import C2 from "./component-two";
Ractive.components['component-one'] = C0;
Ractive.components['nested-component'] = C1;
Ractive.components['component-two'] = C2;
