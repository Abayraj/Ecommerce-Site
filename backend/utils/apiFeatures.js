class APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ?{
            name:{
                 $regex:this.queryStr.keyword,
                 /*
                 This command specifies a regular expression pattern to match against a field (name in this case) and includes the
                  $options flag set to "i" to make the search case-insensitive.
                 */
                 $options:'i'
            }

        }:{}

        this.query = this.query.find({...keyword});
        return this;
    }
}

export default APIFeatures