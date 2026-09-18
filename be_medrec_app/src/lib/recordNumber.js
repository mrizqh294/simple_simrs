export const createRecordNumber = async (lastPatient) => {
  const nextNumber = lastPatient ? lastPatient.id + 1 : 1;

  const recordNumber = `RM-${new Date().getFullYear()}-${String(
    nextNumber,
  ).padStart(6, "0")}`;

  return recordNumber;
};
