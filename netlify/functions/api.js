exports.handler = async function(event) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }

  const params = event.queryStringParameters || {};
  const key = params.APIkey || "";
  const met = params.met || "Fixtures";
  const from = params.from || "";
  const to = params.to || from;
  const matchId = params.matchId || "";

  if (!key) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ success: 0, error: "No API key" }) };
  }

  let url = `https://apiv2.allsportsapi.com/football/?met=${met}&APIkey=${key}`;
  if (from) url += `&from=${from}&to=${to}`;
  if (matchId) url += `&matchId=${matchId}`;
  url += "&timezone=Asia/Kuala_Lumpur";

  try {
    const response = await fetch(url);
    const body = await response.text();
    return { statusCode: response.status, headers: cors, body };
  } catch (err) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ success: 0, error: err.message }) };
  }
};
