import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../auth/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  console.log(query.productCategory);

  try {
    let dbConnect = await clientPromise;
    const data: {}[] = [];
    await dbConnect.db('product').collection(query.productCategory as string).find().forEach((result) => {
      data.push(result);
    });

    res.status(200).json({
      statusCode: 200,
      message: `Successfully read product`,
      result: data
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: `Failed to read product`,
      result: null
    });
  }
};

export default handler;