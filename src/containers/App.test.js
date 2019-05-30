import React from 'react'
import ReactDOM from 'react-dom'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()})

import App from './App'
import AddPlayer from '../components/AddPlayer/AddPlayer'

describe('<App/>', () => {
  let wrap

  beforeEach(() => {
    wrap = shallow(<App/>)
  })

  it('should render AddForm in the header', () => {
    expect(wrap.find(AddPlayer)).toHaveLength(1)
  })
})
