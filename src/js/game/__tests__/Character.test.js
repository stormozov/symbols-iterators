import Character from '../Character';

describe('Character', () => {
  const throwsDict = {
    name: 'Имя должно быть строкой длиной от 2 до 10 символов.',
    type: 'Некорректный тип персонажа.',
    attrs: 'Некорректные атрибуты персонажа.',
    setAttrNumberError: 'Аргументом метода setAttributes() должен быть объект. Получено: number',
  };

  describe('Создание экземпляра', () => {
    test('Создаем экземпляр класса | Экземпляр создан успешно', () => {
      const instance = new Character('Робин', 'Swordsman');
      expect(instance).toBeInstanceOf(Character);
    });
  });

  describe('Валидация входных данных', () => {
    describe('Проверка имени', () => {
      test('Передано имя "123" в виде числа | Вызывается исключение имени', () => {
        expect(() => new Character(123, 'Swordsman')).toThrow(throwsDict.name);
      });

      test('Передано имя "В" | Вызывается исключение короткого имени', () => {
        expect(() => new Character('В', 'Swordsman')).toThrow(throwsDict.name);
      });

      test('Передано имя "Максимилиан" | Вызывается исключение длинного имени', () => {
        expect(() => new Character('Максимилиан', 'Swordsman')).toThrow(throwsDict.name);
      });
    });

    describe('Проверка типа', () => {
      test('Вызывается исключение при нестроковом типе', () => {
        expect(() => new Character('Робин', 123)).toThrow(throwsDict.type);
      });

      test('Вызывается исключение при недопустимом типе', () => {
        expect(() => new Character('Робин', 'Archer')).toThrow(throwsDict.type);
      });
    });
  });

  describe('Метод setAttributes()', () => {
    let instance;

    beforeEach(() => {
      instance = new Character('Робин', 'Swordsman');
    });

    describe('Успешные сценарии', () => {
      test('Переданы базовые атрибуты | Успешно сохранены', () => {
        const attrs = { name: 'Артур', type: 'Bowman' };

        instance.setAttributes(attrs);

        expect(instance.name).toBe(attrs.name);
        expect(instance.type).toBe(attrs.type);
      });

      test('Переданы числовые атрибуты | Успешно сохранены', () => {
        const attrs = { health: 50, level: 4, attack: 10, defense: 50 };

        instance.setAttributes(attrs);

        expect(instance.health).toBe(attrs.health);
        expect(instance.level).toBe(attrs.level);
      });

      test('Передан пустой объект | Использованы по умолчанию', () => {
        const defaultAttrs = { health: 100, level: 1, attack: 0, defense: 0 };

        instance.setAttributes({});

        expect(instance.health).toBe(defaultAttrs.health);
        expect(instance.level).toBe(defaultAttrs.level);
      });
    });

    describe('Обработка ошибок', () => {
      test('Передан аргумент 123 | Получена ошибка аргумента метода', () => {
        expect(() => instance.setAttributes(123))
          .toThrow(throwsDict.setAttrNumberError);
      });

      test('Переданы некорректные атрибуты | Получена ошибка атрибутов', () => {
        expect(() => instance.setAttributes({ name: 'Артур', test: 'Test' }))
          .toThrow(throwsDict.attrs);
      });
    });
  });
});
