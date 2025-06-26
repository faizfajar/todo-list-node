const { Checklist } = require("../models");
const response = require("../helpers/response");

module.exports = {
  async index(req, res) {
    try {
      const data = await Checklist.findAll();
      return response.success(res, "Checklists retrieved successfully", data);
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to retrieve checklists");
    }
  },

  async getChecklistById(req, res) {
    try {
      const { id } = req.params;
      const data = await Checklist.findByPk(id);

      if (!data) return response.notFound(res, "Checklist not found");

      return response.success(res, "Checklist retrieved successfully", data);
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to retrieve checklist");
    }
  },

  async createChecklist(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return response.validationError(res, "Checklist name is required");
      }

      const data = await Checklist.create({
        name,
        status: "incomplete",
        created_by: req.user?.id || null,
      });

      return response.success(res, "Checklist created successfully", data, 201);
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to create checklist");
    }
  },

  async updateChecklist(req, res) {
    try {
      const { id } = req.params;
      const { name, status } = req.body;

      const data = await Checklist.findByPk(id);
      if (!data) return response.notFound(res, "Checklist not found");

      await data.update({
        name: name ?? data.name,
        status: status ?? data.status,
        updated_by: req.user?.id || null,
        updated_at: new Date(),
      });

      return response.success(res, "Checklist updated successfully", data);
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to update checklist");
    }
  },

  async deleteChecklist(req, res) {
    try {
      const { id } = req.params;
      const data = await Checklist.findByPk(id);

      if (!data) return response.notFound(res, "Checklist not found");

      await data.destroy();

      return response.success(res, "Checklist deleted successfully");
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to delete checklist");
    }
  },
};
