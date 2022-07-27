"use strict";

const dynamoDb = require("../config/dynamoDb");
const { sendResponse } = require("../functions/index");
const { 
  v4: uuidv4
} = require('uuid');

module.exports.createRules = async event => {
  const body = JSON.parse(event.body);
  try {
    const { expr, summary , alertname , severity} = body;
    const id = uuidv4();
    const TableName = process.env.DYNAMO_TABLE_NAME;
    const params = {
      TableName,
      Item: {
        id,
        alert_state:"off",
        alertname,
        expr,
        summary,
        severity
      
      },
      ConditionExpression: "attribute_not_exists(id)"
    };
    await dynamoDb.put(params).promise();
    return sendResponse(200, { message: 'Rule created successfully' })
  } catch (e) {
    return sendResponse(500, { message: 'Could not create the rule' });
  }
};
