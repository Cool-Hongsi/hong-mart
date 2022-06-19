import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../auth/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  try {
    let dbConnect = await clientPromise;
    const response = await dbConnect.db('product').collection(body.productCategory).updateOne(
      {
        _id: new ObjectId(body.productId)
      },
      {
        $set: {
          productName: body.productName,
          productPrice: body.productPrice,
          productPriceSale: body.productPriceSale,
          productDescription: body.productDescription
        }
      },
    );

    console.log(response);

    res.status(200).json({
      statusCode: 200,
      message: `Successfully update product - ${body.productId}`,
      result: response
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: `Failed to update product - ${body.productId}`,
      result: null
    });
  }

};

export default handler;