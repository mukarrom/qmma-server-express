import { Router } from "express";
import { UserRoutes } from "../modules/Users/user.route";

const router = Router();
interface IModuleRoutes {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoutes[] = [
  {
    path: "/users",
    route: UserRoutes,
  },
  // {
  //   path: "/products",
  //   route: ProductRoutes,
  // },
  // {
  //   path: "/orders",
  //   route: OrderRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
