const { apiRoot, projectKey } = require("./handson/client.js");
const { log } = require("./logger");


const orderQuery = `
query {
    orders {
      results {
        orderId: id
          orderNumber
          totalPrice {
            centAmount
            currencyCode
            fractionDigits
          }
          createdAt
          shipmentState
          paymentState
          paymentInfo {
            payments {
              paymentStatus {
                interfaceCode
              }
            }
      }   }
    }
  }
  `;

// TODO: POST GraphQL query
const orderResult = async () => {
  const result = apiRoot.withProjectKey({ projectKey }).graphql().post({
    body: {
      query: orderQuery
    }
  }).execute();
  return result
}

//orderResult().then(log).catch(log);

const customerQuery=`
query($id:String){
  customer(id:$id){
    email,
    firstName,
    createdAt,
    key
  }
}
`;
const createCustomerMutatationVariable = {
  "newCustomer":{
    "email":"rohini22@yopmail.com",
    "password" :"Password@11@",
    "firstName": "Rohini",
    "lastName":"Test",
    "key":"rohini22"
  }
}
const createCustomerMutation =`
mutation createCustomer($newCustomer:CustomerSignUpDraft!){
  customerSignUp(draft:$newCustomer){
    customer{
      id,
      createdAt
    }
  }
}
`;

const createCustomer = async()=>{
  const result=await apiRoot.withProjectKey({projectKey}
    ).graphql().post({
      body:{
        query:createCustomerMutation,
        variables:createCustomerMutatationVariable
      }
    }).execute()
    
    // Get customerId from the result
    

    return result;
}
const getCustomerInfo = async(customerId) =>
apiRoot.withProjectKey({projectKey})
  .graphql().post({
    body:{
      query:customerQuery,
    variables:{
      id:customerId
    }
  }
  })
  .execute();

 
//  getCustomerInfo("e4fe339b-dde7-4ca5-a923-eb65e81e6d42").then((customer)=>{
//  console.log("customer Details are  : " + JSON.stringify(customer.body))
//  })

createCustomer().then((customer)=>{
  console.log("newly created customer id : " + 
  JSON.stringify(customer.body))
})

