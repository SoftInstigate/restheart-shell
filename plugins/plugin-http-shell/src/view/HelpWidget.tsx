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

import * as React from "react";
import { TextWithIconWidget } from "@kui-shell/plugin-client-common";
import { Icons } from "@kui-shell/plugin-client-common"

interface Props {
  className?: string;
}

export default class HelpWidget extends React.PureComponent<Props> {
  public render() {
    return (
      <TextWithIconWidget
        className={this.props.className}
        text={''}
        viewLevel="normal"
        id="kui--plugin-http-shell--help-widget"
        title={'Get help with HTTP Shell commands'}
        textOnclick="help http-shell"
        iconOnclick="help http-shell"
      >
        <Icons icon="Info" />
      </TextWithIconWidget>
    );
  }
}
