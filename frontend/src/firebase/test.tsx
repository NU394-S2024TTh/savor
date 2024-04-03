import { onValue, ref } from 'firebase/database';

import { database } from './firebase';

export type Item = {
  name: string;
  purchase_date: string;
  expr_info: string;
};

export async function getItems() {
  return onValue(
    ref(database, '/items'),
    (snap) => {
      if (snap.val()) {
        const data = snap.val();
        data.forEach((item: Item) => {
          console.log(item.name);
          console.log(item.purchase_date);
          console.log(new Date(item.purchase_date));
          console.log(item.expr_info);
        });
        return data;
      }
    },
    (error) => {
      console.error(error);
    },
  );
}
