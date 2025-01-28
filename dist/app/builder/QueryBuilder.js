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
    // Filter method
    filter() {
        const filterQueries = { ...this.query };
        const excludedFields = ["searchTerm", "page", "limit", "sortBy", "sortOrder", "fields"];
        excludedFields.forEach((field) => {
            delete filterQueries[field];
        });
        this.modelQuery = this.modelQuery?.find(filterQueries);
        return this;
    }
    // Sort method
    sort() {
        const sort = this.query?.sort?.split(",")?.join(" ") || "-createdAt";
        this.modelQuery = this?.modelQuery?.sort(sort);
        return this;
    }
    // paginate method
    paginate() {
        const page = parseInt(this.query?.page, 10) || 1;
        const limit = parseInt(this.query?.limit, 10) || 1000;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery?.skip(skip)?.limit(limit);
        return this;
    }
    // define which fields to return
    fields() {
        const fields = this.query?.fields?.split(",")?.join(" ") || "-__v";
        this.modelQuery = this.modelQuery?.select(fields);
        return this;
    }
    // count total (meta) documents
    async countTotal() {
        const totalQueries = this.modelQuery.getFilter();
        // return total documents, total pages, current page, limit per page.
        const totalDocuments = await this.modelQuery.model.countDocuments(totalQueries);
        const totalPages = Math.ceil(totalDocuments / (this.query?.limit || 1000));
        const currentPage = this.query?.page || 1;
        const limitPerPage = this.query?.limit || 1000;
        return { totalDocuments, totalPages, currentPage, limitPerPage };
    }
}
exports.default = QueryBuilder;
