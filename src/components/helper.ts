import { CognitoUserPool } from "amazon-cognito-identity-js";

let poolData = {
	UserPoolId: 'us-east-1_NJwi3LsSr', 
	ClientId: '5ku1di16usjoclmtc6old8cuj2', 
}
export const userPool = new CognitoUserPool(poolData);
