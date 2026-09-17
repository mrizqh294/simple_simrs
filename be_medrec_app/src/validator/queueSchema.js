import * as z from "zod";

export const createQueueSchema = z.object({
  visitId: z.number().int(),
  queueDate: z.coerce.date(),
});

export const updateQueueStatusSchema = z.object({
  status: z.enum(["MENUNGGU", "DIPANGGIL", "DILEWATI", "SELESAI", "BATAL"]),
});
