"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAslug = void 0;
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
const makeAslug = (name) => {
    // Convert to lowercase
    let slug = name.toLowerCase();
    // Remove accents
    slug = removeAccents(slug);
    // Replace "." with "koma"
    slug = slug.replace(/\./g, "koma");
    // Replace spaces and special characters with hyphens
    slug = slug.replace(/\s+/g, "-");
    // Remove any non-alphanumeric characters except hyphens
    slug = slug.replace(/[^a-z0-9-]/g, "");
    // Remove multiple hyphens
    slug = slug.replace(/-+/g, "-");
    // Trim hyphens from start and end
    slug = slug.replace(/^-+|-+$/g, "");
    return slug;
};
exports.makeAslug = makeAslug;
