export default {
  invalid: [
    {
      code: 'type t = {b: string, a: bool};',
      errors: [{message: 'The key `a: ` is not in alphabetical order with `b: `.'}]
    }
  ],
  valid: [
    {
      code: 'type t = {a: string, b: bool};'
    }
  ]
};
