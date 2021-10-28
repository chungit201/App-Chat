import Messenger from "../Model/messengerModel";

export const createMess = async (data) => {
  let message = new Messenger(data);
  return await message.save();
};
