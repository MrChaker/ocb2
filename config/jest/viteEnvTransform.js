"use strict";

module.exports = {
    process(sourceText) {
        return {
            code: sourceText.replaceAll("import.meta.env", "{}"),
        };
    },
};
