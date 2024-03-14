export const excludeFields = <DataType extends object>(
  fields: string[],
  data: DataType
) => {
  if (Array.isArray(data)) {
    const array = data;

    return array.map((element) =>
      Object.fromEntries(
        Object.entries(element).filter(([key]) => !fields.includes(key))
      )
    );
  }

  return Object.fromEntries(
    Object.entries(data as object).filter(([key]) => !fields.includes(key))
  );
};
