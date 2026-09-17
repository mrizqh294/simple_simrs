import * as z from "zod";

const patientSchema = z.object({
    name: z.string().min(2).max(100),
    nik: z.string().min(1).max(16),
    birthdate: z.coerce.date(),
    phone: z.string().min(1).max(16),
    address: z.string().min(10).max(250),
    age: z.number().min(1).max(150),
    gender: z.enum(["L", "P"]),
  });

export default patientSchema;