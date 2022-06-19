import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../auth/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  // console.log(query); // { productCategory: 'meal', productId: '62a78a36f0b91afc157471b3' }

  try {
    let dbConnect = await clientPromise;
    const data = await dbConnect.db('product').collection(query.productCategory as string).findOne(
      {
        _id: new ObjectId(query.productId as string)
      },
    );

    res.status(200).json({
      statusCode: 200,
      message: `Successfully read single product`,
      result: data
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: `Failed to read single product`,
      result: null
    });
  }
};

export default handler;