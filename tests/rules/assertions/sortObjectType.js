export default {
  invalid: [
    {
      code: 'type t = {b: string, a: bool};',
      errors: [{message: 'The key `a: ` is not in alphabetical order with `b: `.'}]
    },
    {
      code: 'type t = {b: bool, type: string};',
      errors: [{message: 'The key `type: ` should be the first one.'}]
    }
  ],
  valid: [
    {
      code: 'type t = {a: string, b: bool};'
    },
    {
      code: 'type t = {type: string, b: bool};'
    }
  ]
};
