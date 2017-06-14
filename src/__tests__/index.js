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

import React from 'react'
import { shallow } from 'enzyme'
import oldState from '..'

@oldState
class SomeComponent extends React.Component {
  render() {
    return <div>Ctrine!</div>
  }
}

const STATE_A = { a: 1 }
const STATE_B = { a: 1, b: 2 }
const STATE_C = { a: 1, b: 2, c: 3 }

describe('Decorator “oldState” applied on “SomeComponent”', () => {
  it('has the same constructor', () => {
    const WRAPPER = shallow(<SomeComponent/>)
    const INSTANCE = WRAPPER.instance()
    expect(Object.getPrototypeOf(INSTANCE).constructor)
      .toBe(SomeComponent)
  })

  it('saves the old state on “oldState” when it changes', () => {
    const WRAPPER = shallow(<SomeComponent/>)
    const INSTANCE = WRAPPER.instance()

    expect(INSTANCE.oldState)
      .toEqual(INSTANCE.state)

    WRAPPER.setState(STATE_A)
    expect(INSTANCE.oldState)
      .toEqual(null)

    WRAPPER.setState(STATE_B)
    expect(INSTANCE.oldState)
      .toEqual(STATE_A)

    WRAPPER.setState(STATE_C)
    expect(INSTANCE.oldState)
      .toEqual(STATE_B)
  })
})
