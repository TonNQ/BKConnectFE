import { ReceiveSocketData, WebSocketDataType } from 'src/types/socket.type';
import { Message, RoomType } from 'src/types/room.type';
import { User } from 'src/types/user.type';

export const processSocketMessage = (
  receiveMsg: ReceiveSocketData,
  room: RoomType | null,
  prevMessages: Message[],
  profile: User | null
): Message[] => {
  console.log('room in utils: ', room)
  switch (receiveMsg.data_type) {
    case WebSocketDataType.IsMessage: {
      if (receiveMsg.message.room_id === room?.id) return prevMessages;
      if (receiveMsg.message.sender_id !== profile?.user_id) {
        return [receiveMsg.message, ...prevMessages];
      } else {
        const indexToUpdate = prevMessages.findIndex(
          (message) => message.message_id === 0 && message.temp_id === receiveMsg.message.temp_id
        );
        if (indexToUpdate !== -1) {
          const updatedMessages = [
            ...prevMessages.slice(0, indexToUpdate),
            receiveMsg.message,
            ...prevMessages.slice(indexToUpdate + 1)
          ];
          return updatedMessages;
        } else {
          return prevMessages;
        }
      }
    }
    default: {
      // Handle other cases if needed
    }
  }
  return prevMessages;
};