import type { Group } from "@/types/Group";
import type { StoreData } from "@/types/StoreData";
import axios from "axios";
import type { Store } from "vuex";

export const getGroupById = async (
  store: Store<StoreData>,
  id: string
): Promise<Group> => {
  if (store.state.groupById[id] == undefined) {
    store.state.groupById[id] = await axios.post(
      "http://localhost:8080/get_group_ids/user",
      id
    );
  }
  return store.state.groupById[id];
};

export const getGroupsOfUser = async (
  store: Store<StoreData>
): Promise<Group[]> => {
  const rawResult = await axios.post(
    "http://localhost:8080/get_groups/user",
    store.state.user
  );
  return rawResult.data;
};
