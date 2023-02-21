// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.

//It just needs two diffent tests, does it turn on 

import React from 'react'
import Spinner from './Spinner'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

// test('sanity', () => {
//   expect(true).toBe(false)
// })

test('Sprinner props change', () => {
  render(<Spinner />)
})


