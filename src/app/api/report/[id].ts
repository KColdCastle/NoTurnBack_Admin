// import type { NextApiRequest, NextApiResponse } from 'next';

// import prisma from '../../../lib/db';

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const reportId = req.query.id;

//   switch (req.method) {
//     case 'DELETE':
//       return handleDELETE(reportId, res);

//     default:
//       throw new Error(
//         `The HTTP ${req.method} method is not supported at this route`
//       );
//   }
// }

// async function handleDELETE(reportId: unknown, res: NextApiResponse<any>) {
//   const report = await prisma.report.delete({
//     where: { id: String(reportId) },
//   });
//   return res.json(report);
// }
