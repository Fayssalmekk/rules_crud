"use strict";

const { sendResponse } = require("../functions/index");
const dynamoDb = require("../config/dynamoDb");

module.exports.updateRule = async event => {
  try {
    const { id } = event.pathParameters;

    const { expr, summary, alertname, severity, alert_state }  = JSON.parse(event.body);
  
 
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {
        id
      },
      ExpressionAttributeValues: {
        ":expr": expr,
        ":summary": summary,
        ":alertname": alertname,
        ":severity": severity,
        ":alert_state": alert_state

      },
      UpdateExpression: "SET expr = :expr, summary = :summary , alertname = :alertname , severity = :severity , alert_state = :alert_state",
      ReturnValues: "ALL_NEW"
    };

    const data = await dynamoDb.update(params).promise();
    if (data.Attributes) {
      return sendResponse(200, data.Attributes);
    } else {
      return sendResponse(404, { message: "Updated rule data not found" });
    }
  } catch (e) {
    console.log(e);
    return sendResponse(500, { message: "Could not update this rule" });
    
  }
};
