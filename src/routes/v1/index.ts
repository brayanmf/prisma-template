import express from 'express';
import inmuebleRoute from './inmueble.route';
const {
    NODE_ENV,
     
  } = process.env

const router = express.Router();

const defaultRoutes = [
    {
        path: '/inmuebles',
        route: inmuebleRoute
    }
];

// const devRoutes = [
//     {
//         path: '/docs',
//         route: docsRoute
//     }
// ];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

if (NODE_ENV=== 'development') {
    // devRoutes.forEach((route) => {
    //     router.use(route.path, route.route);
    // });s
}

export default router;