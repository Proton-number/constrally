// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();

//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const position = formData.get("position") as string;
//     const cv = formData.get("cv") as File;

//     if (!name || !email || !position || !cv) {
//       return Response.json(
//         { message: "All fields are required" },
//         { status: 400 },
//       );
//     }

//     const buffer = Buffer.from(await cv.arrayBuffer());

//     await resend.emails.send({
//       from: "Careers <careers@constrally.com>",
//       to: "hr@constrally.com",
//       replyTo: email,
//       subject: `Job Application: ${position}`,
//       text: `
// Name: ${name}
// Email: ${email}
// Position: ${position}

// A CV has been attached to this application.
//       `,
//       attachments: [
//         {
//           filename: cv.name,
//           content: buffer,
//         },
//       ],
//     });

//     return Response.json({
//       message: "Application sent successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json({ message: "Something went wrong" }, { status: 500 });
//   }
// }
