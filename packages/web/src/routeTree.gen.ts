/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'

// Create/Update Routes

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated/': {
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([AuthenticatedIndexRoute])

/* prettier-ignore-end */
