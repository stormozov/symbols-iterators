/**
 * Класс персонажа.
 */
export default class Character {

  /**
   * Валидные типы персонажа.
   */
  static #validTypes = [
    'Bowman',
    'Swordsman',
    'Magician',
    'Demon',
    'Undead',
    'Zombie'
  ];

  constructor(name, type) {
    // Валидация входных данных
    this.#validateNameAndType(name, type);

    // Свойства персонажа
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = 0;
    this.defense = 0;
  }

  /**
   * Установка атрибутов персонажа.
   */
  setAttributes(attrs) {
    this.#validateAttrs(attrs);

    const hasName = Object.prototype.hasOwnProperty.call(attrs, 'name');
    const hasType = Object.prototype.hasOwnProperty.call(attrs, 'type');
    if (hasName || hasType) this.#validateNameAndType(attrs.name, attrs.type);

    [...Object.keys(attrs)].forEach((key) => this[key] = attrs[key]);
  }

  /**
   * Валидация имени и типа персонажа.
   * 
   * @param {string} name - Имя персонажа.
   * @param {string} type - Тип персонажа.
   * 
   * @throws {Error} - Если имя или тип персонажа некорректны.
   */
  #validateNameAndType(name, type) {
    if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть строкой длиной от 2 до 10 символов.');
    }

    if (!Character.#validTypes.includes(type)) {
      throw new Error('Некорректный тип персонажа.');
    }
  }

  #validateAttrs(attrs) {
    if (typeof attrs !== 'object') {
      throw new Error(
        `Аргументом метода setAttributes() должен быть объект. Получено: ${typeof attrs}`
      );
    }

    for (const key of Object.keys(attrs)) {
      if (!Object.prototype.hasOwnProperty.call(this, key)) {
        throw new Error('Некорректные атрибуты персонажа.');
      }
    }
  }
}
