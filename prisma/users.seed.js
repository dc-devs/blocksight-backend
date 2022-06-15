"use strict";
exports.__esModule = true;
exports.allUsersCount = exports.users = exports.thirdUser = exports.secondUser = exports.firstUser = exports.password = void 0;
var faker_1 = require("@faker-js/faker");
var client_1 = require("@prisma/client");
var bcrypt_1 = require("../src/models/users/utils/bcrypt");
var users = [];
exports.users = users;
exports.password = '12345678';
var firstUser = {
    email: 'davidc@prisma.io',
    password: (0, bcrypt_1.encodePassword)(exports.password),
    role: client_1.UserRole.SUPER_ADMIN
};
exports.firstUser = firstUser;
users.push(firstUser);
var secondUser = {
    email: 'david@prisma.io',
    password: (0, bcrypt_1.encodePassword)(exports.password),
    role: client_1.UserRole.ADMIN
};
exports.secondUser = secondUser;
users.push(secondUser);
var thirdUser = {
    email: 'dave@prisma.io',
    password: (0, bcrypt_1.encodePassword)(exports.password),
    role: client_1.UserRole.ADMIN
};
exports.thirdUser = thirdUser;
users.push(thirdUser);
var count = 1;
var userCount = 53;
while (count <= userCount) {
    var user = {
        email: faker_1.faker.internet.email(),
        password: (0, bcrypt_1.encodePassword)(faker_1.faker.internet.password())
    };
    users.push(user);
    count += 1;
}
var allUsersCount = users.length;
exports.allUsersCount = allUsersCount;
