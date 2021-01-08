import { isSomeObject, isArray, isFunction } from 'locustjs-base'

jest.mock('react-redux', () => {
    return { connect: function () { } }
});

import { createActionReducer } from '../index.esm.js'

const debug = false;

function generalTest(arg) {
    test('should return { actions, reducer, initalState }', () => {
        const ar = createActionReducer(arg);

        if (debug) {
            console.log(ar)
        }

        expect(ar.actions).toBeDefined();
        expect(ar.initialState).toBeDefined();
        expect(ar.reducer).toBeDefined();
    });
    test('actions should be an object', () => {
        const ar = createActionReducer(arg);

        expect(isSomeObject(ar.actions)).toBeTruthy();
    });
    test('initialState should be an object', () => {
        const ar = createActionReducer(arg);

        expect(isSomeObject(ar.initialState)).toBeTruthy();
    });
    test('reducer should be a function', () => {
        const ar = createActionReducer(arg);

        expect(isFunction(ar.reducer)).toBeTruthy();
    });
}

describe('createActionReducer', function () {
    // ---------------- state --------------------
    describe('Providing only state', function () {
        describe('arg: "count"', function () {
            const arg = 'count';

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: { state: "count" }', function () {
            const arg = { state: "count" };

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: { count: 10 }', function () {
            const arg = { count: 10 }

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: { state: { count: 10 } }', function () {
            const arg = { state: { count: 10 } }

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: ["count"]', function () {
            const arg = ['count'];

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [{ state: "count" } ]', function () {
            const arg = [{ state: "count" }];

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [{ count: 10 }]', function () {
            const arg = [{ count: 10 }]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [{ state: { count: 10 } }]', function () {
            const arg = [{ state: { count: 10 } }];

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
    });
    // ---------------- type, state ------------------
    describe('Providing type and state', function () {
        describe('arg: { type: "SET_COUNT", count: 10 }', function () {
            const arg = { type: "SET_COUNT", count: 10 }

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with type = "SET_COUNT"', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.type).toBe("SET_COUNT");
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [{ type: "SET_COUNT", count: 10 }]', function () {
            const arg = [{ type: "SET_COUNT", count: 10 }]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with type = "SET_COUNT"', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.type).toBe("SET_COUNT");
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [[ "SET_COUNT", "count" ]]', function () {
            const arg = [["SET_COUNT", "count"]]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with type = "SET_COUNT"', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.type).toBe("SET_COUNT");
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: { type: "SET_COUNT", state: "count" }', function () {
            const arg = { type: "SET_COUNT", state: "count" };

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with type = "SET_COUNT"', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.type).toBe("SET_COUNT");
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [{ type: "SET_COUNT", state: "count" }]', function () {
            const arg = [{ type: "SET_COUNT", state: "count" }];

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with type = "SET_COUNT"', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.type).toBe("SET_COUNT");
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: { type: "SET_COUNT", state: { "count": 10 } }', function () {
            const arg = { type: "SET_COUNT", state: { "count": 10 } }

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with type = "SET_COUNT"', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.type).toBe("SET_COUNT");
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [{ type: "SET_COUNT", state: { "count": 10 } }]', function () {
            const arg = [{ type: "SET_COUNT", state: { "count": 10 } }]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with type = "SET_COUNT"', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.type).toBe("SET_COUNT");
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [[ "SET_COUNT", { "count": 10 } ]]', function () {
            const arg = [["SET_COUNT", { "count": 10 }]]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with type = "SET_COUNT"', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.type).toBe("SET_COUNT");
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
    });
    // ---------------- state, action: Function ------------------
    describe('Providing state and action: Function', function () {
        describe('arg: { state: "count", action: Function }', function () {
            let flag = false;
            const arg = {
                state: 'count',
                action: (s, a) => {
                    flag = true;
                    return { ...s, count: a.count }
                }
            }

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        describe('arg: [{ state: "count", action: Function }]', function () {
            let flag = false;
            const arg = [{
                state: 'count',
                action: (s, a) => {
                    flag = true;
                    return { ...s, count: a.count }
                }
            }]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        describe('arg: { state: { "count": 10 }, action: Function }', function () {
            let flag = false;
            const arg = {
                state: { count: 10 },
                action: (s, a) => {
                    flag = true;
                    return { ...s, count: a.count }
                }
            }

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        describe('arg: [{ state: { "count": 10 }, action: Function }]', function () {
            let flag = false;
            const arg = [{
                state: { count: 10 },
                action: (s, a) => {
                    flag = true;
                    return { ...s, count: a.count }
                }
            }]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        //============ array =============
        describe('arg: [ "count", Function ]', function () {
            let flag = false;
            const arg = [
                [
                    'count',
                    (s, a) => {
                        flag = true;
                        return { ...s, count: a.count }
                    }
                ]
            ]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        describe('arg: [ { "count": 10 }, Function ]', function () {
            let flag = false;
            const arg = [
                [
                    { count: 10 },
                    (s, a) => {
                        flag = true;
                        return { ...s, count: a.count }
                    }
                ]
            ]

            generalTest(arg);

            test('should have a "setCount" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCount).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCount(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCount(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCount(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
    });
    // ---------------- state, action: string ------------------
    describe('Providing state and action: string', function () {
        describe('arg: { state: "count", action: "setCnt" }', function () {
            const arg = { state: 'count', action: "setCnt" }

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [{ state: "count", action: "setCnt" }]', function () {
            const arg = [{ state: 'count', action: "setCnt" }]

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: { state: { "count": 10 }, action: "setCnt" }', function () {
            const arg = { state: { "count": 10 }, action: "setCnt" }

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [{ state: { "count": 10 }, action: "setCnt" }]', function () {
            const arg = [{ state: { "count": 10 }, action: "setCnt" }]

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        //============ array =============
        describe('arg: [ "count", "setCnt" ]', function () {
            const arg = [["count", "setCnt"]]

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
        describe('arg: [ { "count": 10 }, "setCnt" ]', function () {
            const arg = [[{ "count": 10 }, "setCnt"]]

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
            });
        });
    });
    // ---------------- state, action: object ------------------
    describe('Providing state and action: object', function () {
        describe('arg: { state: "count", action: { "setCnt": Function } }', function () {
            let flag = false;
            const arg = {
                state: 'count',
                action: {
                    "setCnt": (s, a) => {
                        flag = true;
                        return { ...s, count: a.count }
                    }
                }
            }

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        describe('arg: [{ state: "count", action: { "setCnt": Function } }]', function () {
            let flag = false;
            const arg = [{
                state: 'count',
                action: {
                    "setCnt": (s, a) => {
                        flag = true;
                        return { ...s, count: a.count }
                    }
                }
            }]

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        describe('arg: { state: { "count": 10 }, action: { "setCnt": Function } }', function () {
            let flag = false;
            const arg = {
                state: { "count": 10 },
                action: {
                    "setCnt": (s, a) => {
                        flag = true;
                        return { ...s, count: a.count }
                    }
                }
            }

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        describe('arg: [{ state: { "count": 10 }, action: { "setCnt": Function } }]', function () {
            let flag = false;
            const arg = [{
                state: { "count": 10 },
                action: {
                    "setCnt": (s, a) => {
                        flag = true;
                        return { ...s, count: a.count }
                    }
                }
            }]

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer should be custom and reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        //============ array =============
        describe('arg: [ "count", { "setCnt": Function } ]', function () {
            let flag = false;
            const arg = [[
                "count",
                {
                    "setCnt": (s, a) => {
                        flag = true;
                        return { ...s, count: a.count }
                    }
                }
            ]]

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be undefined', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBeUndefined();
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
        describe('arg: [ { "count": 10 }, "setCnt" ]', function () {
            let flag = false;
            const arg = [[
                { "count": 10 },
                {
                    "setCnt": (s, a) => {
                        flag = true;
                        return { ...s, count: a.count }
                    }
                }
            ]]

            generalTest(arg);

            test('should have a "setCnt" action"', () => {
                const ar = createActionReducer(arg);

                expect(ar.actions.setCnt).toBeDefined();
            });
            test('initialState.count should be 10', () => {
                const ar = createActionReducer(arg);

                expect(ar.initialState.count).toBe(10);
            });
            test('setCnt(10) should return an action with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);

                expect(ac.count).toBe(10);
            });
            test('reducer(setCnt(10)) should return a state with "count" = 10.', () => {
                const ar = createActionReducer(arg);

                const ac = ar.actions.setCnt(10);
                const state = ar.reducer({}, ac);

                expect(state.count).toBe(10);
                expect(flag).toBe(true);
            });
        });
    });
})
