const { apiRoot, projectKey } = require("./client.js");


module.exports.createNewState = (stateDraftData) =>
apiRoot.withProjectKey({projectKey}).states().post({
  body:createStateDraft(stateDraftData)
}).execute();


const createStateDraft = (stateDraftData) => {
  const { key, type, name, initial } = stateDraftData;
  return {
    key,
    type,
    name,
    initial,
  };
};

module.exports.getStateByKey = (key) => 
apiRoot.withProjectKey({projectKey}).states().withKey({key})
.get().execute();

module.exports.getStateById = (ID) =>
apiRoot.withProjectKey({projectKey}).states().withId({ID})
.get().execute();

module.exports.createStatesWithTransitions = (ID, transitionStateIds) =>
this.getStateById(ID).then((stateObj)=>{
  console.log(stateObj.body.key);
  return apiRoot.withProjectKey({projectKey}).states()
  .withId({ID})
  .post({
    body:addTransitionState(stateObj,ID, transitionStateIds)
  }).execute();
});



const addTransitionState = (stateObj,stateId1,stateId2) =>{
    return {
      "version": stateObj.body.version,
    "actions": [
        {
            "action" : "setTransitions",
            "transitions" : [ {
              "typeId" : "state",
              "id" : stateId2[0]
            } ]
          }
        ]
      }
    }

