"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // Search method
    search(searchableFields) {
        if (this?.query?.searchTerm) {
            this.modelQuery = this.modelQuery?.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: this.query?.searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
}
exports.default = QueryBuilder;
