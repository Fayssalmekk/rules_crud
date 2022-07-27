"use strict";

const { sendResponse } = require("../functions/index");
const dynamoDb = require("../config/dynamoDb");

module.exports.deleteRules = async event => {
  try {
    const { id } = event.pathParameters;
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {
        id
      }
    };
    await dynamoDb.delete(params).promise();
    return sendResponse(200, { message: "Rule deleted successfully" });
  } catch (e) {
    return sendResponse(500, { message: "Could not delete the rule" });
  }
};
