// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function jsonToBase64(object: any) {
  const json = JSON.stringify(object);
  return Buffer.from(json).toString('base64');
}

export function base64ToJson(base64String: string) {
  const json = Buffer.from(base64String, 'base64').toString();
  return JSON.parse(json);
}
