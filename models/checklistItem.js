"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ChecklistItem extends Model {
    static associate(models) {
      ChecklistItem.belongsTo(models.Checklist, {
        foreignKey: "checklist_id",
        as: "checklist",
      });
    }
  }

  ChecklistItem.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ChecklistItem",
      tableName: "checklist_items",
      underscored: true,
      hooks: {
        afterCreate: async (instance, options) => {
          const auditUserId = options.auditUserId;
          const auditRequestId = options.auditRequestId;
          const auditIpAddress = options.auditIpAddress;

          if (auditUserId || auditIpAddress) {
            try {
              await sequelize.models.AuditLog.create(
                {
                  table_name: "checklist_items",
                  record_id: instance.id,
                  action: "CREATE",
                  performed_by: auditUserId,
                  request_id: auditRequestId,
                  ip_address: auditIpAddress,
                },
                { transaction: options.transaction }
              );
            } catch (error) {
              console.log("====================================");
              console.log(error);
              console.log("====================================");
            }
          }
        },
        afterUpdate: async (instance, options) => {
          const auditUserId = options.auditUserId;
          const auditRequestId = options.auditRequestId;
          const auditIpAddress = options.auditIpAddress;

          if (auditUserId || auditIpAddress) {
            try {
              await sequelize.models.AuditLog.create(
                {
                  table_name: "checklist_items",
                  record_id: instance.id,
                  action: "UPDATE",
                  performed_by: auditUserId,
                  request_id: auditRequestId,
                  ip_address: auditIpAddress,
                },
                { transaction: options.transaction }
              );
            } catch (error) {
              console.log("====================================");
              console.log(error);
              console.log("====================================");
            }
          }
        },
        afterDestroy: async (instance, options) => {
          const auditUserId = options.auditUserId;
          const auditRequestId = options.auditRequestId;
          const auditIpAddress = options.auditIpAddress;

          if (auditUserId || auditIpAddress) {
            try {
              await sequelize.models.AuditLog.create(
                {
                  table_name: "checklist_items",
                  record_id: instance.id,
                  action: "DELETE",
                  performed_by: auditUserId,
                  request_id: auditRequestId,
                  ip_address: auditIpAddress,
                },
                { transaction: options.transaction }
              );
            } catch (error) {
              console.log("====================================");
              console.log(error);
              console.log("====================================");
            }
          }
        },
      },
    }
  );

  return ChecklistItem;
};
