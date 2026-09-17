import * as z from "zod";

const registrationSchema = z.object({
  nik: z.string().min(1),
  name: z.string().min(2).max(100),
  age: z.number().int().min(0),
  gender: z.enum(["L", "P"]),
  birthdate: z.coerce.date(),
  phone: z.string().min(1),
  address: z.string().min(1),
  doctorId: z.number().int(),
  poliId: z.number().int(),
  description: z.string().min(1),
});

export default registrationSchema;
