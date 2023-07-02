import LanguageType from "./LanguageType";

export default interface ProfileType {
    id: number,
    user_id: number
    name: string,
    age: number,
    native_language: LanguageType,
    foreign_language: LanguageType,
    location: string,
    intro: string,
    images: string[]
}