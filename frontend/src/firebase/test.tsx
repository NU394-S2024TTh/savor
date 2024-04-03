import { database } from "./firebase";
import { onValue, ref } from "firebase/database";

export type Item = {
  name: string;
  expr_info: string;
};

export async function getItems() {
  return onValue(ref(database, '/items'), snap => {
    if (snap.val()) {
      const data = snap.val();
      data.forEach((item: Item) => {
        console.log(item.name);
        console.log(item.expr_info);
      });
      return data;
    }
  }, error => {
    console.error(error)
  });
};