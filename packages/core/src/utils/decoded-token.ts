interface IDecodeToken {
  email: string;
  token: string;
}
export const decodedToken = (data: string | null) => {
  if (!data) {
    return null;
  }
  const res = JSON.parse(atob(data)) as IDecodeToken;

  return res;
};
