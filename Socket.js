import React from 'react';
import {connect, io} from 'socket.io-client';

export const socket = io('https://queryq.veevotech.com', {autoConnect: true});
