// INPUTS: Env, Used Id, Token, Developer Name, Redirect URL
import { phyllo_standard_keys } from "./constants";


const validateParams = (params) => {
  if (!params.env || !["sandbox", "production", "dev"].includes(params.env)) {
    throw new Error("Please Provide Valid Environment");
  }
  if (!params.userId) {
    throw new Error("Please Provide User Id");
  }
  if (!params.appName) {
    throw new Error("Please Provide App Name");
  }
  if (!params.token) {
    throw new Error("Please Provide Token");
  }
};

const clientConnect = async (
  env,
  userId,
  token,
  appName,
  workPlatformId = null,
  redirectURL = window.location.href
) => {
  try {
    validateParams({ env, userId, token, appName });
    var workPlatformIdQueryParam = `workPlatformId=${workPlatformId}&`;
    if (
      workPlatformId === null ||
      workPlatformId === undefined ||
      workPlatformId === ""
    ) { 
      workPlatformIdQueryParam = "";
    }
    var phylloConnectURL = `${phyllo_standard_keys.PHYLLO_CONNECT_URL_KEY}?userId=${userId}&appName=${appName}&workPlatformId=${workPlatformId}&redirectURL=${redirectURL}&token=${token}&env=${env}`;
    return phylloConnectURL;
  } catch (err) {
    console.error(err);
  }
};

const connect = async (clientConnectObj) => {
  //var {env, userID, token, appName, workPlatformId, redirectURL} = clientConnectObj;
  var env = clientConnectObj[phyllo_standard_keys.PHYLLO_ENVIRONMENT_KEY] ;
  var userId = clientConnectObj[phyllo_standard_keys.PHYLLO_USER_ID_KEY];
  var token = clientConnectObj[phyllo_standard_keys.PHYLLO_TOKEN_KEY];
  var appName = clientConnectObj[phyllo_standard_keys.PHYLLO_APP_NAME_KEY];
  var workPlatformId = (clientConnectObj[phyllo_standard_keys.PHYLLO_WORKPLATFORM_ID_KEY]);
  var redirectURL = clientConnectObj[phyllo_standard_keys.PHYLLO_REDIRECT_URL_KEY];

  try{
    validateParams({ env, userId, token, appName });
    (workPlatformId) ? '' : workPlatformId;
    (redirectURL) ? window.location.href : redirectURL;
    return `${phyllo_standard_keys.PHYLLO_CONNECT_URL_KEY}?userId=${userId}&appName=${appName}&workPlatformId=${workPlatformId}&redirectURL=${redirectURL}&token=${token}&env=${env}`;
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = {clientConnect : clientConnect, connect : connect}
