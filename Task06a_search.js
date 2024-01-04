const { getAllProducts, simulateSearch } = require("./handson/search");
const { log } = require("./logger");
const { apiRoot, projectKey } = require("./handson/client.js");


 //getAllProducts().then(log).catch(log)

//simulateSearch().then(log).catch(log);


(async () => {
    try {
        await apiRoot.withProjectKey({projectKey})
            .productProjections()
            .search()
            .get({
                queryArgs: {
                    "text.en": "Bag Hogan brown", // Full Text search
                }
            })
            .execute()
            .then(data => {
                console.log('Product projection search result --->', data.body.results)
            })
            .catch(error => {
                console.log('ERROR --->', error)
            })
    } catch (error) {
        console.log('ERROR --->', error)
    }
})()
