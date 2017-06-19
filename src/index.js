// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.
// @flow

import { Component } from 'react'

export function oldState(targetComponent:Class<Component>) {
  let prototype = targetComponent.prototype

  Object.defineProperty(prototype, 'oldState', {
    get() {
      return this._oldState
    }
  })

  let oldComponentWillMount = prototype.componentWillMount
  prototype.componentWillMount = function() {
    this._oldState = this.state
    if (oldComponentWillMount)
      oldComponentWillMount()
  }

  let oldComponentWillUpdate = prototype.componentWillUpdate
  prototype.componentWillUpdate = function(nextProps, nextState) {
    this._oldState = this.state
    if (oldComponentWillUpdate)
      oldComponentWillUpdate(nextProps, nextState)
  }

  return targetComponent
}

export default oldState
