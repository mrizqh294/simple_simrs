import * as z from "zod";

const userSchema = z
  .object({
    name: z.string().min(2).max(100),

    email: z.string().email(),

    password: z.string().min(6).max(100),

    role: z.enum([
      "ADMIN",
      "DOKTER",
      "PERAWAT",
      "PENDAFTARAN",
    ]),

    poliIds: z
      .array(z.number().int().positive())
      .min(1)
      .refine((ids) => new Set(ids).size === ids.length, {
        message: "Poli tidak boleh duplikat",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (["DOKTER", "PERAWAT"].includes(data.role)) {
        return data.poliIds && data.poliIds.length > 0;
      }

      return true;
    },
    {
      message: "Dokter atau perawat harus memiliki minimal satu poli",
      path: ["poliIds"],
    }
  );

export default userSchema;

