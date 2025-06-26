const { ChecklistItem, Checklist } = require("../models");
const response = require("../helpers/response");

module.exports = {
  async getChecklistItemByChecklistId(req, res) {
    try {
      const { id: checklist_id } = req.params;

      const checklist = await Checklist.findByPk(checklist_id);
      if (!checklist) return response.notFound(res, "Checklist not found");

      const items = await ChecklistItem.findAll({
        where: { checklist_id },
      });

      return response.success(
        res,
        "Checklist items retrieved successfully",
        items
      );
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to retrieve checklist items");
    }
  },

  async createChecklistItem(req, res) {
    try {
      const { id: checklist_id } = req.params;
      const { itemName } = req.body;

      if (!itemName) return response.validationError(res, "ItemName is required");

      const checklist = await Checklist.findByPk(checklist_id);
      if (!checklist) return response.notFound(res, "Checklist not found");

      const item = await ChecklistItem.create({
        checklist_id,
        name : itemName,
        status: "incomplete",
        created_by: req.user?.emp_id || null,
      });

      return response.success(res, "Checklist item created", item, 201);
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to create item");
    }
  },

  async getChecklistItemById(req, res) {
    try {
      const { item_id } = req.params;

      const item = await ChecklistItem.findByPk(item_id);
      if (!item) return response.notFound(res, "Item not found");

      return response.success(res, "Item retrieved successfully", item);
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to retrieve item");
    }
  },

  async updateChecklistItem(req, res) {
    try {
      const { item_id } = req.params;
      const { itemName, status } = req.body;

      const item = await ChecklistItem.findByPk(item_id);
      if (!item) return response.notFound(res, "Item not found");

      if (!itemName) return response.validationError(res, "ItemName is required");

      await item.update({
        name: itemName ?? item.name,
        status: status ?? item.status,
        updated_by: req.user?.emp_id || null,
      });

      return response.success(res, "Item updated successfully", item);
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to update item");
    }
  },

  async deleteChecklistItem(req, res) {
    try {
      const { item_id } = req.params;

      const item = await ChecklistItem.findByPk(item_id);
      if (!item) return response.notFound(res, "Item not found");

      await item.destroy();
      return response.success(res, "Item deleted successfully");
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to delete item");
    }
  },

  async renameChecklistItem(req, res) {
    try {
      const { item_id } = req.params;
      const { itemName } = req.body;

      if (!itemName) return response.validationError(res, "New name is required");

      const item = await ChecklistItem.findByPk(item_id);
      if (!item) return response.notFound(res, "Item not found");

      await item.update({
        itemName,
        updated_by: req.user?.emp_id || null,
      });

      return response.success(res, "Item renamed successfully", item);
    } catch (err) {
      console.error(err);
      return response.error(res, "Failed to rename item");
    }
  },
};
