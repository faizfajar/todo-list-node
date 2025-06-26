const express = require("express");
const router = express.Router();
const checklistController = require("../controllers/checklistController");
const checklistItemController = require("../controllers/checklistItemController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", checklistController.index);
router.get("/:id", checklistController.getChecklistById);
router.post("/", checklistController.createChecklist);
router.put("/:id", checklistController.updateChecklist);
router.delete("/:id", checklistController.deleteChecklist);
// checklist-items
router.get("/:id/item", checklistItemController.getChecklistItemByChecklistId);
router.post("/:id/item", checklistItemController.createChecklistItem);
router.get("/:id/item/:item_id", checklistItemController.getChecklistItemById);
router.put("/:id/item/:item_id", checklistItemController.updateChecklistItem);
router.delete("/:id/item/:item_id", checklistItemController.deleteChecklistItem);
router.put("/:id/item/rename/:item_id", checklistItemController.renameChecklistItem);


module.exports = router;
