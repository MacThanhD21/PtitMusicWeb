const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
    title: String,
    permissions: {
        type: Array,
        default: []
    },
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy:{
        account_id: String,
        createdAt:{
            type: Date,
            default: Date.now
        }
    },
    deletedBy:{
        account_id: String,
        deletedAt: Date
    },
    updatedBy:[
        {
            account_id: String,
            updatedAt: Date
        }
    ]
});

const Role = mongoose.model("Roles", roleSchema, "roles");

module.exports = Role;