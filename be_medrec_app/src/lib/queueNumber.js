export const createQueueNumber = async (lastQueue, poliId) => {
  let queueCode = "A";

  switch (poliId) {
    case 1:
      queueCode = "A";
      break;

    case 2:
      queueCode = "B";
      break;

    case 3:
      queueCode = "C";
      break;

    case 4:
      queueCode = "D";
      break;

    default:
      queueCode = "A";
      break;
  }

  let queueNumber = 1;

  if (lastQueue) {
    const lastNumber = Number(
      lastQueue.queueNumber.substring(1)
    );

    queueNumber = lastNumber + 1;
  }

  return `${queueCode}${String(queueNumber).padStart(3, "0")}`;
};