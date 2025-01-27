"use strict";

/**
 * subject controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::subject.subject", ({ strapi }) => ({
  async create(ctx) {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in to create a subject");
      }

      const { subject_id, Name } = ctx.request.body.data;

      if (!subject_id || !Name) {
        return ctx.badRequest("Missing required fields: subject_id or Name");
      }

      const teacherId = user.id;

      const newSubject = await strapi.entityService.create(
        "api::subject.subject",
        {
          data: {
            subject_id,
            Name,
            teacher: teacherId,
          },
        }
      );

      return (ctx.body = {
        message: "Subject created successfully",
        data: newSubject,
      });
    } catch (err) {
      ctx.throw(500, "Something went wrong", { error: err.message });
    }
  },
}));
