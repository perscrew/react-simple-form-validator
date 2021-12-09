import { Errors } from '../../src/models/interfaces';
import { ErrorUtils } from '../../src/utils/error-utils';

describe('ErrorUtils', () => {
  let errors: Errors[];

  beforeEach(() => {
    errors = [
      { fieldName: 'email', failedRules: ['email'], messages: ['The field "email" must be a valid email address.'] },
      {
        fieldName: 'firstName',
        failedRules: ['minlength', 'maxlength'],
        messages: [
          'The field "firstName" length must be greater than 3.',
          'The field "firstName" length must be lower than 8.'
        ]
      }
    ];
  });

  describe('isFieldInError', () => {
    test('should returns true for email field', () => {
      expect(ErrorUtils.isFieldInError(errors, 'email')).toEqual(true);
    });

    test('should returns false for unknown field', () => {
      expect(ErrorUtils.isFieldInError(errors, 'lastName')).toEqual(false);
    });
  });

  describe('getFailedRules', () => {
    test('should returns object with fieldName key', () => {
      expect(ErrorUtils.getFailedRules(errors)).toEqual({
        email: ['email'],
        firstName: ['minlength', 'maxlength']
      });
    });
  });

  describe('getErrorsForField', () => {
    test('should returns error object for a given field', () => {
      expect(ErrorUtils.getErrorsForField(errors, 'email')).toEqual({
        fieldName: 'email',
        failedRules: ['email'],
        messages: ['The field "email" must be a valid email address.']
      });
    });

    test('should returns undefined for an unknown field', () => {
      expect(ErrorUtils.getErrorsForField(errors, 'lastName')).toBeUndefined();
    });
  });

  describe('getErrorMessages', () => {
    test('should returns error messages concatenated', () => {
      expect(ErrorUtils.getErrorMessages(errors)).toEqual(
        'The field "email" must be a valid email address.\nThe field "firstName" length must be greater than 3.\nThe field "firstName" length must be lower than 8.'
      );
    });

    test('should returns error messages concatenated with * character', () => {
      expect(ErrorUtils.getErrorMessages(errors, '*')).toEqual(
        'The field "email" must be a valid email address.*The field "firstName" length must be greater than 3.*The field "firstName" length must be lower than 8.'
      );
    });
  });

  describe('getFailedRulesInField', () => {
    test('should return failed rules for fieldName', () => {
      const mockGetFailedRulesInField = jest.fn().mockReturnValue({
        fieldName: 'email',
        failedRules: ['email'],
        messages: ['The field "email" must be a valid email address.']
      });
      ErrorUtils.getErrorsForField = mockGetFailedRulesInField;

      expect(ErrorUtils.getFailedRulesInField(errors, 'email')).toEqual(['email']);
    });
  });

  describe('getErrorsInField', () => {
    test('should return error messages for fieldName', () => {
      const mockGetErrorsInField = jest.fn().mockReturnValue({
        fieldName: 'email',
        failedRules: ['email'],
        messages: ['The field "email" must be a valid email address.']
      });
      ErrorUtils.getErrorsInField = mockGetErrorsInField;

      expect(ErrorUtils.getFailedRulesInField(errors, 'email')).toEqual(['email']);
    });
  });
});
