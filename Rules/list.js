"use strict";

const dynamoDb = require("../config/dynamoDb");
const { sendResponse } = require("../functions/index");

module.exports.listRules = async event => {
  try {
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
    }
    const rules = await dynamoDb.scan(params).promise();
    return sendResponse(200, { items: rules.Items });
  } catch (e) {
    return sendResponse(500, { message: "Could not get the rules list" });
  }
};
