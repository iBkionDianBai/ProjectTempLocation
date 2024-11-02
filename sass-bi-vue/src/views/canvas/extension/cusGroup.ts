import { GroupNode } from "@logicflow/extension";

class MyGroup extends GroupNode.defaultProps.view {}
class MyGroupModel extends GroupNode.defaultProps.model {
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = "#AEAFAE";
    style.strokeDasharray = "3 3";
    style.strokeWidth = 1;
    return style;
  }
}

export default {
  type: "my-group",
  model: MyGroupModel,
  view: MyGroup,
};
