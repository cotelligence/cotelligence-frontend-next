export const parseError = (e: any) =>
  e?.message || e?.data?.message || e?.msg || e?.data?.msg || 'Somthing wrong!';
