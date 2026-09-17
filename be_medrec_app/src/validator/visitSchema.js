import * as z from "zod";

export const visitSchema = z.object({
  patientId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  poliId: z.number().int().positive(),
  description: z.string().min(2).max(1000),
});

export const updateVisitStatusSchema = z.object({
  status: z.enum(["MENUNGGU", "CHECK_IN", "PEMERIKSAAN", "SELESAI", "BATAL"]),
});
