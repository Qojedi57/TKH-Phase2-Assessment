import express from "express";
import prisma from "../db/index.js";

export default function setupUserRouter() {
  const router = express.Router();

  // Create the routes here
  router.get("/", async function (request, response) {
    const allUsers = await prisma.user.findMany({
      where: {
        userId: request.user.id,
      },
      include: {
        user: true,
      },
    });

    response.status(200).json({
      success: true,
      users: allUsers,
    });
  });

  router.post("/", async function (request, response) {
    const newUsers = await prisma.user.create({
      data: {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        id: request.user.id,
      },
    });

    console.log(newUsers);

    response.status(201).json({
      success: true,
    });
  });

  router.put("/:userId", async function (request, response) {
    const usersId = parseInt(request.params.userId);
    try {
      await prisma.users.update({
        where: {
          id: usersId,
        },
        data: {
          ...request.body,
        },
      });

      response.status(200).json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      if (e.code == "P2025") {
        response.status(404).json({
          success: false,
        });
      } else {
        response.status(500).json({
          success: false,
        });
      }
    }
  });

  router.delete("/:userId", async function (request, response) {
    const userId = parseInt(request.params.userId);
    try {
      await prisma.users.delete({
        where: {
          id: userId,
        },
      });

      response.status(200).json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      if (e.code == "P2025") {
        response.status(404).json({
          success: false,
        });
      } else {
        response.status(500).json({
          success: false,
        });
      }
    }
  });

  router.get("/:user", async function (request, response) {
    const allUsers = await prisma.user.findMany({
      where: {
        userId: request.user.id,
      },
      include: {
        user: false,
      },
    });

    response.status(200).json({
      success: false,
      users: allUsers,
    });
  });

  return router;
}
