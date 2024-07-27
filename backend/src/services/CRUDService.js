import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        // image: data.image,
        roleId: data.roleId,
        // positionId: data.positionId,
      });

      resolve("Created a new user!");
    } catch (err) {
      reject(err);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
};
