/*
 * Copyright 2020 SoftInstigate Srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Registrar,
  Arguments,
  Store,
  UsageError,
  MultiModalResponse,
} from "@kui-shell/core";
import { getUsage as usage } from "../usage";

import { get, Response } from "superagent";

import Debug from "debug";

const debug = Debug("plugins/restheart-shell/get");

const getCmd = async ({
  argvNoOptions: args,
  REPL,
}: Arguments): Promise<MultiModalResponse | string> => {
  if (!args || args.length < 2) {
    throw new UsageError({ usage: usage });
  } else {
    const uri = args[1];
    const urlPrefix = Store().getItem("url");

    if (!urlPrefix) {
      return 'url not set. use "set url"';
    }

    const uriSlashPrefixed = uri.length > 0 && uri[0] === "/";
    const urlTrailingSlash = urlPrefix[urlPrefix.length - 1] === "/";

    const url =
      uriSlashPrefixed && urlTrailingSlash
        ? `${urlPrefix.substring(urlPrefix.length - 1)}${uri}`
        : !uriSlashPrefixed && !urlTrailingSlash
        ? `${urlPrefix}/${uri}`
        : `${urlPrefix}${uri}`;

    return get(url)
      .accept("application/json")
      .set("Content-Type", "application/json")
      .auth(Store().getItem("id"), Store().getItem("pwd"))
      .then((res: Response) => {
        debug(res);
        const ret: MultiModalResponse = {
          metadata: { name: `🐱 GET ${url}` },
          modes: [],
          kind: "Response",
        };

        if (res.body) {
          ret.modes.push({
            mode: "Body",
            content: JSON.stringify(res.body, null, 2),
            contentType: "json",
          });
        }

        ret.modes.push(
          {
            mode: "Status",
            content: `Status: ${res.status}\n\nStatus Text: ${res["statusText"]}`,
            contentType: "text/markdown",
          },
          {
            mode: "Headers",
            content: res.headers ? JSON.stringify(res.headers, null, 2) : "",
            contentType: "json",
          }
        );

        return ret;
      })
      .catch((error) => {
        const ret: MultiModalResponse = {
          metadata: { name: `🐱 GET ${urlPrefix}${uri}` },
          kind: "Error",
          modes: [
            {
              mode: "Status",
              content: `Status: ${error.status}\n\nStatus Text: ${error.response.statusText}`,
              contentType: "text/markdown",
            },
          ],
        };

        if (error.body) {
          ret.modes.push({
            mode: "Response body",
            content: error.body ? JSON.stringify(error.body, null, 2) : "",
            contentType: "json",
          });
        }

        ret.modes.push({
          mode: "Details",
          content: JSON.stringify(error, null, 2),
          contentType: "json",
        });

        return ret;
      });
  }
};

export default async (registrar: Registrar) => {
  registrar.listen("/get", getCmd, {
    usage: usage,
    noAuthOk: true,
  });
};
