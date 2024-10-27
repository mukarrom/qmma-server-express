"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/Users/user.route");
const academicYear_route_1 = require("../modules/AcademicYear/academicYear.route");
const class_route_1 = require("../modules/Classes/class.route");
const group_route_1 = require("../modules/Groups/group.route");
const guardian_route_1 = require("../modules/Guardians/guardian.route");
const student_route_1 = require("../modules/Students/student.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/guardians",
        route: guardian_route_1.GuardianRoutes,
    },
    {
        path: "/students",
        route: student_route_1.StudentRoutes,
    },
    {
        path: "/academic-years",
        route: academicYear_route_1.AcademicYearRoutes,
    },
    {
        path: "/classes",
        route: class_route_1.ClassRoutes,
    },
    {
        path: "/groups",
        route: group_route_1.GroupRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
