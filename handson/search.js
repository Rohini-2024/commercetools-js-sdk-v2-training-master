const { apiRoot, projectKey } = require("./client.js");

module.exports.getAllProducts = () =>
apiRoot.withProjectKey({ projectKey})
.products().get({
    queryArgs:{
        limit:1
    }
}).execute();

// filter query recalculates everything
// filter facet recalculates others only
module.exports.simulateSearch = () => {}

module.exports.simulatePagination = async (perPage, where) => {

}
