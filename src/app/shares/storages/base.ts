export function loadObject(key: string, defaultValue: any) {
  const raw = localStorage.getItem(key);
  if (raw) {
    return JSON.parse(raw);
  }
  return defaultValue;
}

export function saveObject(key: string, obj: any) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function removeObject(key: string) {
  localStorage.removeItem(key);
}


export function isSavedObject(key: string): boolean {
  return localStorage.getItem(key) != null;
}
