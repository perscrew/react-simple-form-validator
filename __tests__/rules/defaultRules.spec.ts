import defaultRules from '../../src/rules/defaultRules';

describe('DefaultRules', () => {
  describe('numbers rule', () => {
    test('should pass for a valid number', () => {
      expect(defaultRules.numbers.test('23')).toBeTruthy();
    });

    test('should not pass for a sentence', () => {
      expect(defaultRules.numbers.test('test')).toBeFalsy();
    });
  });

  describe('email rule', () => {
    test('should pass for a valid email', () => {
      expect(defaultRules.email.test('test@titi.com')).toBeTruthy();
    });

    test('should not pass for an invalid email', () => {
      expect(defaultRules.email.test('test.titi')).toBeFalsy();
    });
  });

  describe('required rule', () => {
    test('should pass for a non empty string', () => {
      expect(defaultRules.required.test('t')).toBeTruthy();
    });

    test('should not pass for an empty string', () => {
      expect(defaultRules.required.test('')).toBeFalsy();
    });
  });

  describe('hasNumber rule', () => {
    test('should pass for a string containing a number', () => {
      expect(defaultRules.hasNumber.test('test 32')).toBeTruthy();
    });

    test('should not pass for an empty string', () => {
      expect(defaultRules.hasNumber.test('test')).toBeFalsy();
    });
  });

  describe('hasLowerCase rule', () => {
    test('should pass for a string containing at least one lowercase', () => {
      expect(defaultRules.hasLowerCase.test('TESt')).toBeTruthy();
    });

    test('should not pass for a string containing uppercase', () => {
      expect(defaultRules.hasLowerCase.test('TEST')).toBeFalsy();
    });
  });

  describe('hasSpecialCharacter rule', () => {
    test('should pass for a string containing at least one special character', () => {
      expect(defaultRules.hasSpecialCharacter.test('test @')).toBeTruthy();
    });

    test('should not pass for a string containing no special characer', () => {
      expect(defaultRules.hasSpecialCharacter.test('test')).toBeFalsy();
    });
  });

  describe('minlength rule', () => {
    test('should pass for a string containing more than 3 characters', () => {
      expect(defaultRules.minlength(3, 'tes')).toBeTruthy();
    });

    test('should not pass for a string containing only 2 characters', () => {
      expect(defaultRules.minlength(3, 'te')).toBeFalsy();
    });
  });

  describe('maxlength rule', () => {
    test('should pass for a string containing less than 7 characters', () => {
      expect(defaultRules.maxlength(6, '123456')).toBeTruthy();
    });

    test('should not pass for a string containing more than 7 characters', () => {
      expect(defaultRules.maxlength(6, '1234567')).toBeFalsy();
    });
  });

  describe('equalPassword rule', () => {
    test('should pass for a identical passwords', () => {
      expect(defaultRules.equalPassword('toto', 'toto')).toBeTruthy();
    });

    test('should not pass for non identical passwords', () => {
      expect(defaultRules.equalPassword('toto', 'titi')).toBeFalsy();
    });
  });

  describe('date rule', () => {
    test('should pass for a valid date', () => {
      expect(defaultRules.date('YYYY-MM-DD', '2021-12-14')).toBeTruthy();
    });

    test('should not pass for a non valid date', () => {
      expect(defaultRules.equalPassword('YYYY-MM-DD', '20200212')).toBeFalsy();
    });
  });
});
