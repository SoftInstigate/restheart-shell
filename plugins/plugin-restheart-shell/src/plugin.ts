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

import { Registrar } from "@kui-shell/core";
// import Debug from "debug";
import { registerTest } from "./lib/cmds/test";
import { registerSetAuth } from "./lib/cmds/set-auth";
import { registerSetUrl } from "./lib/cmds/set-url";
import { registerGetUrl } from "./lib/cmds/get-url";
import { registerGetAuth } from "./lib/cmds/get-auth";
import { registerGet } from "./lib/cmds/get";

// const debug = Debug("plugins/restheart-shell");

export default async (registrar: Registrar) => {
  registerTest(registrar);
  registerSetAuth(registrar);
  registerSetUrl(registrar);
  registerGetUrl(registrar);
  registerGetAuth(registrar);
  registerGet(registrar);
};
