import path from 'node:path';
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const { POST, GET } = makeRouteHandler({
  config,
  localBaseDirectory: path.resolve(process.cwd(), '..'),
});
