/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from "axios";

/**
 * Funciton to get port
 * @param {Request} req
 * @param {String} url
 * @returns
 */
export const callShieldServer = async (req, url) => {
  try {
    if (!global.YahConfig?.clientId || !global.YahConfig?.clientSecret) {
      throw new Error("Yahilo app config is not set");
    }
    // Get yahilo app config from global
    const { clientId, clientSecret } = global.YahConfig;

    if (!req?.headers || !req?.headers["authorization"]) {
      throw new Error("Authorization header is not set");
    }
    // Get bear token from req header
    const bearToken = req.headers["authorization"];

    const headers = {
      Accept: "application/json",
      Authorization: bearToken,
      "Content-Type": "application/json",
      "Client-Id": clientId,
      "Client-Secret": clientSecret,
    };

    const response = await axios.post(url, {}, { headers });
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.data;
    if (errorMessage) throw new Error(errorMessage);
    throw error;
  }
};
