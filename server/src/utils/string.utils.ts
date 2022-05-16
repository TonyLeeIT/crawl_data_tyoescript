export const removeEmptyString = (characters: string[]): string[] => {
  for (let character of characters) {
    if (!character.trim()) characters.splice(characters.indexOf(character), 1);
  }
  return characters;
};

export const removeAccents = (characters: string[]): string[] => {
  const newCharacters: string[] = [];
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
