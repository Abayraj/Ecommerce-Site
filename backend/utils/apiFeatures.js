class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            /*
                 This command specifies a regular expression pattern to match against a field (name in this case) and includes the
                  $options flag set to "i" to make the search case-insensitive.
                 */
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    //Removing fileds from the query string
    console.log(queryCopy,"hello")
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    //Advance filter for price ,ratings ect
    let queryStr = JSON.stringify(queryCopy);
    //blue g is for search all globaly match and for making changes
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    //return this for method chaining
    return this;
  }
  pagination(resultPrePage){
    const currentPage = Number(this.queryStr.page) || 1;
    //skip data that shown to be in page
    const skip = resultPrePage * (currentPage - 1);
    this.query = this.query.limit(resultPrePage).skip(skip);
    return this;
  } 
}

export default APIFeatures;
