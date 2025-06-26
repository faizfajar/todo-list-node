"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Checklist extends Model {
    // 
  }

  Checklist.init(
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
      modelName: "Checklist",
      tableName: "checklists",
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
                  table_name: "checklists",
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
                  table_name: "checklists",
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
                  table_name: "checklists",
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

  return Checklist;
};
