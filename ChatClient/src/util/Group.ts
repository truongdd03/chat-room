import type { Group } from "@/types/Group";
import type { StoreData } from "@/types/StoreData";
import axios from "axios";
import type { Store } from "vuex";

export const getGroupById = async (
  store: Store<StoreData>,
  id: string
): Promise<Group> => {
  if (store.state.groupById[id] == undefined) {
    const rawResult = await axios.post("http://localhost:8080/get_group", id);
    store.state.groupById[id] = rawResult.data;
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

export const addGroup = async (
  usernames: string[],
  groupName: string
): Promise<string> => {
  const rawResult = await axios.post(
    "http://localhost:8080/new_group",
    {
      usernames: usernames,
      groupName: groupName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return rawResult.data;
};
