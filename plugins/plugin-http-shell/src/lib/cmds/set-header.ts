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

import { Arguments, Registrar, Store, UsageError } from "@kui-shell/core";

import { setHeaderUsage as usage, errorMsg } from "../usage";

const setHeaderCmd = async ({ argvNoOptions: args }: Arguments) => {
  if (!args || args.length < 5) {
    throw new UsageError({ message: errorMsg(usage), usage: usage });
  } else {
    let _headers = Store().getItem("headers");

    if (!_headers) {
      _headers = '[]';
    }

    const headers = JSON.parse(_headers);

    headers.push({k: args[3], v: args[4]});

    Store().setItem("headers", JSON.stringify(headers));

    return "ok";
  }
};

export default async (registrar: Registrar) => {
  registrar.listen("/h/set/header", setHeaderCmd, {
    usage: usage,
    noAuthOk: true
  });
};
