import Team from '../Team';
import Character from '../Character';

describe('Класс Team', () => {
  let team;

  beforeEach(() => {
    team = new Team();
  });

  describe('Экземпляр', () => {
    it('Создаем экземпляр класса | Экземпляр создан успешно', () => {
      expect(team).toBeInstanceOf(Team);
    });
  });

  describe('Методы', () => {
    const character1 = new Character('Лучник', 'Bowman');
    const character2 = new Character('Демон', 'Demon');
    const incorrectData = [{}, 123, 'test', null, undefined, true, false, []];

    describe('Метод add()', () => {
      it('Передан персонаж | Добавляет его в команду', () => {
        team.add(character1);
        expect(team.members).toEqual(new Set([character1]));
      });

      it('Передан персонаж, который уже есть в команде | Выбрасывается исключение', () => {
        team.add(character1);
        expect(() => team.add(character1)).toThrow('Персонаж уже в команде');
      });

      it('Переданы некорректные данные в аргумент | Выбрасывается исключение', () => {
        incorrectData.forEach((data) => {
          expect(() => team.add(data)).toThrow('Персонаж должен быть экземпляром класса Character');
        });
      });

      it('Вызывается без аргументов | Выбрасывается исключение', () => {
        expect(() => team.add()).toThrow('Персонаж должен быть экземпляром класса Character');
      });
    });

    describe('Метод addAll()', () => {
      const expectedMembers = new Set([character1, character2]);

      it('Переданы два уник. персонажа | Добавляет их в коллекцию команды', () => {
        team.addAll(character1, character2);
        expect(team.members).toEqual(expectedMembers);
      });

      it('Переданы разные типы данных | Добавляет только персонажей', () => {
        team.addAll(character1, character2, {}, 123, 'test');
        expect(team.members).toEqual(expectedMembers);
      });

      it('Переданы персонажи дубликаты | Добавляет только уникальных персонажей', () => {
        team.addAll(character1, character2, character1);
        expect(team.members).toEqual(expectedMembers);
      });

      it('Не переданы персонажи | Возвращает пустой массив', () => {
        team.addAll();
        expect(team.toArray()).toEqual([]);
      });
    });

    describe('Метод toArray()', () => {
      it('Команда не пуста | Возвращает массив персонажей', () => {
        team.addAll(character1, character2);
        expect(team.members).toEqual(new Set([character1, character2]));
      });

      it('Команда пуста | Возвращает пустой массив', () => {
        expect(team.toArray()).toEqual([]);
      });
    });

    describe('Метод clear()', () => {
      it('Вызывается | Команда очищается', () => {
        team.addAll(character1, character2);
        team.clear();

        expect(team.members).toEqual(new Set([]));
      });
    });

    describe('Метод remove()', () => {
      describe('Успешные случаи', () => {
        it('Передан персонаж | Удаляет его из команды', () => {
          team.addAll(character1, character2);
          team.remove(character1);

          expect(team.members).toEqual(new Set([character2]));
        });

        it('Передано два персонажа | Удаляет только последний', () => {
          const characters = [character1, character2];

          team.addAll(...characters);
          team.remove(...characters);

          expect(team.members).toEqual(new Set([character2]));
        });
      });

      describe('Обработка исключений', () => {
        it('Переданы некорректные данные в аргумент | Выбрасывается исключение', () => {
          incorrectData.forEach((data) => {
            expect(() => team.remove(data))
              .toThrow('Персонаж должен быть экземпляром класса Character');
          });
        });

        it('Передан персонаж, которого нет в команде | Выбрасывается исключение', () => {
          expect(() => team.remove(character1)).toThrow('Персонажа нет в команде');
        });
      });
    });

    describe('Итератор', () => {
      const character3 = new Character('Jakob', 'Magician');
      const character4 = new Character('Clara', 'Demon');
      const character5 = new Character('Orlando', 'Undead');

      const characters = [
        character1, character2, character3, character4, character5
      ];

      it('Перебирает двух персонажей | Возвращает done: true после последнего', () => {
        team.addAll(character1, character2);
        const iterator = team[Symbol.iterator]();

        expect(iterator.next()).toEqual({ value: character1, done: false });
        expect(iterator.next()).toEqual({ value: character2, done: false });
        expect(iterator.next()).toEqual({ done: true });
      });

      it('Перебирает коллекцию из 5 персонажей | Возвращает персонажей команды', () => {
        team.addAll(...characters);

        // Для разнообразия использую подход через for of
        const members = [];
        for (const member of team) {
          members.push(member);
        }

        expect(members).toEqual(characters);
      });

      it('Корректно работает при изменении коллекции во время итерации | Возвращает обновленный список', () => {
        const testingCharacters = characters.slice(0, 3);
        const expectedCharacters = [];

        testingCharacters.forEach((character) => {
          team.add(character);
          expectedCharacters.push(character);

          expect([...team]).toEqual(expectedCharacters);
        });
      });

      it('Удаляет персонажа из команды | Возвращает обновленный список', () => {
        const expectedCharacters = characters.slice(1);

        team.addAll(...characters);
        team.remove(character1);
        
        expect([...team]).toEqual(expectedCharacters);
      });

      it('Фильтрует команду по типу персонажа | Возвращает персонажей определенного типа', () => {
        team.addAll(character1, character2, character3);
        const filteredCharacters = [...team].filter((character) => character.type === 'Magician');
        
        expect(filteredCharacters).toEqual([character3]); // Предполагается, что character3 - маг
      });    

      it('Перебирает пустую команду | Возвращает пустой массив', () => {
        expect([...team]).toEqual([]);
      });
    });
  });
});
