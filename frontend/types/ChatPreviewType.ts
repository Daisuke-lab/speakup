import MessageType from "./MessageType";
import ProfileType from "./ProfileType";

export default interface ChatPreview {
    chat_id: number,
    profile: ProfileType,
    last_message: MessageType
}