export const checkFetchResponse = async (res: Response) => {
  if (!res.ok) {
    const json = await res.json();

    throw json;
  }
};
