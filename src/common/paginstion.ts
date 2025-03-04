

export async function paginate<T>(
  model: any,              // Your Mongoose model
  query: any = {},          // Query filters
  page: number = 1,         // Current page from request
  limit: number = 10,       // Page size from request
  sort: any = { createdAt: -1 } // Optional sorting
): Promise<any> {
  const count = await model.countDocuments(query);
  const numOfPages = Math.ceil(count / limit);
  console.log("query==", query);
  const filter = {};
  if(query.name){
    filter["name"] = { $regex: new RegExp('^' + query['name']) };
  }

  const data = await model
    .find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  const paginationObj = {
    count,
    numOfPages,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < numOfPages ? page + 1 : null,
  }; 

  return {
    data:data,
    pagination: paginationObj
  };
}
