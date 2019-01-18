# Component-local state

Why does React have state? Answer: It's not functional, but it's practial.

Benefits

- It's there.
- It's component-local. Your code looks the same whether you have one or 100 instances of a component; you don't have to worry about identifying a component instance in global scope.

Limitations

- Race conditions.
- Class-based API isn't good for integrating with listeners etc. Have to manually track handles. Hooks will solve this.
- It's component-local. Doesn't help with coordinating state across many components
- You'll get the mechanics of state management mixed up with your business logic.

Show and tell

- Multiple race conditions in the code.
- Boilerplace and unclear logic.
- Don't forget the async callback version of setState.

---

# Moving state outside the components

Presentational and Container Components

- There is a parallel to controlled and uncontrolled components (for inputs).
- Seperation of concerns!
- Testing with storybook
- [Medium post by Dan Ambramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

Model instances/stores

- OOP can be good.
- React needs a lot of boilerplate to get this right.

Reducer pattern

- What is a reducer? Think Array.reduce.
- Take the previous state and an action, return the output.
- Functional! Easy to test.

---

# Moving state outside of the React tree

Move the data completely outside of the tree.

There are tradeoffs (e.g. have to manually coordinate lookups for data for each component). E.g. a Toggle button, now each item would need a key so you can lookup the state.

Flux

![Flow](static/flux-flow.png)

- One way data flow.
- Stores.
- Dispatcher is about coordinating multiple stores.

Redux

- Actions.
- Action creators.
- Reducers.

Relay/Apollo

- Similar to GraphQL
- Instead of dispatching actions; dispatch requests for specific data and mutations.

---

# Other Options

State machines: https://xstate.js.org/docs/guides/context.html#initial-context
