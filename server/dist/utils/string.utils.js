"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccents = exports.removeEmptyString = void 0;
const removeEmptyString = (characters) => {
    for (let character of characters) {
        if (!character.trim())
            characters.splice(characters.indexOf(character), 1);
    }
    return characters;
};
exports.removeEmptyString = removeEmptyString;
const removeAccents = (characters) => {
    const newCharacters = [];
    for (let character of characters) {
        character = character
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/\s/g, "")
            .toLowerCase();
        newCharacters.push(character);
    }
    return newCharacters;
};
exports.removeAccents = removeAccents;
