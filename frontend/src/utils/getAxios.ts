import axios from "axios";
import { CustomSessionType } from "../../types/CustomSessionType";

const API_VERSION = "v1"

export default function getAxios(session:CustomSessionType | null) {
  let headers = {"Content-Type": "application/json", "Authorization": ""}
  if (session !== null) {
    headers["Authorization"] = `Bearer ${session?.accessToken}`
  }
  const backendAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/${API_VERSION}`,
    responseType: "json",
    headers: headers,
  });
  return backendAxios
}
