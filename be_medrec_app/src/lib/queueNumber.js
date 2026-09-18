export const createQueueNumber = async (lastQueue) => {
  let queueNumber = "A001";

  if (lastQueue) {
    const lastNumber = Number(lastQueue.queueNumber.substring(1));

    const nextNumber = lastNumber + 1;

    queueNumber = `A${String(nextNumber).padStart(3, "0")}`;
  }

  return queueNumber;
};
