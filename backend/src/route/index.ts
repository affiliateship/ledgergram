import {router as postRouter} from './post';
import {router as accountRouter} from './account';
import express  from 'express';

export const router: express.IRouter[] = [
    postRouter,
    accountRouter
];