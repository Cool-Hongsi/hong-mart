import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  // Temporary Admin Info
  const ADMIN_INFO = {
    username: 'hongsi',
    password: 'abcd1234'
  };

  try {
    if (ADMIN_INFO['username'] === body['adminUsername'] && ADMIN_INFO['password'] === body['adminPassword']) {
      res.status(200).json({
        statusCode: 200,
        message: 'Matched Admin Info',
        result: true
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: 'Not Matched Admin Info',
        result: false
      });
    }
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: err,
      result: false
    });
  }
};

export default handler;