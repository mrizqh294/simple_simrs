import * as z from "zod";

const medicalRecordSchema = z.object({
  visitId: z.number().int(),
  bloodTension: z.string().min(1),
  temperature: z.string().min(1),
  height: z.number().positive(),
  weight: z.number().positive(),
  diagnosis: z.string().min(1),
  symptom: z.string().min(1),
  actionPlan: z.string().min(1),
  receipt: z.string().min(1),
});

export default medicalRecordSchema;
