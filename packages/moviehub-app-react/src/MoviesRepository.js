import React from 'react';
import { get } from 'lodash';

import FetchMoviesService from './FetchMoviesService';
import logo from './logo.svg';

let debounceSearch;
