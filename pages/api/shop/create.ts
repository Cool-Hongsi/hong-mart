import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../auth/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  try {
    let dbConnect = await clientPromise;
    const response = await dbConnect.db('product').collection(body.productCategory).insertOne({
      ...body,
      createdAt: new Date()
    });

    console.log(response);

    res.status(200).json({
      statusCode: 200,
      message: `Successfully create product - ${body.productName}`,
      result: body
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: `Failed to create product - ${body.productName}`,
      result: body
    });
  }

};

export default handler;