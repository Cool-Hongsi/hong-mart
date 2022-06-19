import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../auth/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  console.log(query);

  let data: {}[] = [];

  try {
    let dbConnect = await clientPromise;
    // Get collection list
    const collectionList = await dbConnect.db('product').collections();

    // Find matching data with query.searchby (options 'i' => Not care about uppercase and lowercase)
    for (let i = 0; i < collectionList.length; i++) {
      console.log(`Collection Name: ${collectionList[i].collectionName}`);

      await collectionList[i].find({ productName: { $regex: query.searchby, $options: 'i' } }).forEach((result) => {
        data.push(result);
      })
    };

    res.status(200).json({
      statusCode: 200,
      message: `Successfully read product with searchby ${query.searchby}`,
      result: data
    });

  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: `Failed to read product with searchby ${query.searchby}`,
      result: null
    });
  }
};

export default handler;
