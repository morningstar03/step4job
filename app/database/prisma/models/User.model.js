const { createModel } = require("schemix");

import PostModel from "./Post.model";
import UUIDMixin from "../mixins/UUID.mixin";

export default createModel("UserModel", (UserModel) => {
  UserModel.mixin(UUIDMixin)
    .relation("friends", UserModel, { list: true, name: "friends" })
    .relation("friendsRelation", UserModel, { list: true, name: "friends" })
    .relation("posts", PostModel, { list: true });
});
