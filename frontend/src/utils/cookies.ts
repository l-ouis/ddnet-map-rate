import Cookies from "js-cookie";
import mapData from '../../data/map_data.json';

function getMapID(name: string): number {
  const map_data = mapData[name as keyof typeof mapData];
  if (map_data == null) {
    throw new Error(`Map "${name}" not found in mapData`);
  }
  return Number(map_data.id);
}

export function addNameCookie(name: string): void {
  Cookies.set("name", name);
}

export function addTokenCookie(token: string): void {
  Cookies.set("token", token);
}

export function getNameCookie(): string | undefined {
  const cookie = Cookies.get("name");
  if (cookie === undefined) {
    return "nameless tee"
  }
  return cookie;
}

export function getTokenCookie(): string | undefined {
  const cookie = Cookies.get("token");
  if (cookie === undefined) {
    return "0"
  }
  return cookie;
}

export function removeUserCookies(): void {
  Cookies.remove("name");
  Cookies.remove("token");
}