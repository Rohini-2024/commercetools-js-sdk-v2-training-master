const { apiRoot, projectKey } = require("./client.js");
const { log } = require("../logger.js");


module.exports.createCustomeType = (typeDraft) =>
    apiRoot.withProjectKey({ projectKey }).types().post({
        body: typeDraft
    }).execute();


module.exports.craeteCustomeObj = (customObjectDraft) =>
    apiRoot.withProjectKey({ projectKey }).customObjects().post({
        body: customObjectDraft
    }).execute();

module.exports.getCustomeObjByContainerAndKey = (container, key) =>
    apiRoot.withProjectKey({ projectKey }).customObjects()
        .withContainerAndKey({ container  , key }).get().execute();