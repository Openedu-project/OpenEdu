import { Input } from "../../input";
import {
  CatchArgs,
  Failable,
  JSONata,
  Nextable,
  RetryArgs,
  State,
  StateArgs,
} from "./state";

export interface MapArgs extends StateArgs {
  /**
   * The list of items to process.
   *
   * @example
   * For example, you can specify an array of items.
   *
   * ```ts
   * {
   *   items: ["item1", "item2", "item3"]
   * }
   * ```
   *
   * Or, specify a JSONata expression that evaluates to an array of items.
   *
   * ```ts
   * {
   *   items: "{% $states.input.items %}"
   * }
   * ```
   */
  items?: Input<JSONata | any[]>;
  /**
   * Reformat the values of the input array items before they're passed on to each 
   * state iteration.
   *
   * For example, you can pass in what you want the fields to be.
   *
   * ```ts
   * {
   *   "itemSelector": {
   *     "size": 10,
   *     "value.$": "$$.Map.Item.Value"
   *   }
   * }
   * ```
   *
   * When applied to the following list of items.
   *
   * ```ts
   * [
   *   {
   *     "resize": "true",
   *     "format": "jpg"
   *   },
   *   {
   *     "resize": "false",
   *     "format": "png"
   *   }
   * ]
   * ```
   *
   * A transformed item will look like.
   *
   * ```ts
   * {
   *   "size": 10,
   *   "value": {
   *     "resize": "true",
   *     "format": "jpg"
   *   }
   * }
   * ```
   *
   * Learn more about [`ItemSelector`](https://docs.aws.amazon.com/step-functions/latest/dg/input-output-itemselector.html).
   */
  itemSelector?: Input<Record<string, Input<any>>>;
  /**
   * An upper bound on the number of `Map` state iterations that can run in parallel.
   * Takes an integer or a JSONata expression that evaluates to an integer.
   *
   * Default to 0, which means there's no limit on the concurrency.
   *
   * @default `0`
   * @example
   * For example, to limit it to 10 concurrent iterations.
   * ```ts
   * {
   *   maxConcurrency: 10
   * }
   * ```
   */
  maxConcurrency?: Input<JSONata | number>;
  /**
   * The state to execute for each item in the array.
   *
   * @example
   *
   * For example, to iterate over an array of items and execute a Lambda function
   * for each item.
   *
   * ```ts title="sst.config.ts"
   * const processor = sst.aws.StepFunctions.lambdaInvoke({
   *   name: "Processor",
   *   function: "src/processor.handler"
   * });
   *
   * sst.aws.StepFunctions.map({
   *   processor,
   *   name: "Map",
   *   items: "{% $states.input.items %}"
   * });
   * ```
   */
  processor: State;
}

/**
 * The `Map` state is internally used by the `StepFunctions` component to add a [Map
 * workflow state](https://docs.aws.amazon.com/step-functions/latest/dg/state-map.html)
 * to a state machine.
 *
 * :::note
 * This component is not intended to be created directly.
 * :::
 *
 * You'll find this component returned by the `map` method of the `StepFunctions` component.
 */
export class Map extends State implements Nextable, Failable {
  private processor: State;

  constructor(protected args: MapArgs) {
    super(args);
    this.processor = args.processor.getHead();
    this.addChildGraph(this.processor);
  }

  /**
   * Add a next state to the `Map` state. If the state completes successfully,
   * continue execution to the given `state`.
   *
   * @param state The state to transition to.
   *
   * @example
   *
   * ```ts title="sst.config.ts"
   * sst.aws.StepFunctions.map({
   *   // ...
   * })
   * .next(state);
   * ```
   */
  public next<T extends State>(state: T): T {
    return this.addNext(state);
  }

  /**
   * Add a retry behavior to the `Map` state. If the state fails with any of the
   * specified errors, retry the execution.
   *
   * @param args Properties to define the retry behavior.
   *
   * @example
   *
   * This defaults to.
   *
   * ```ts title="sst.config.ts" {5-8}
   * sst.aws.StepFunctions.map({
   *   // ...
   * })
   * .retry({
   *   errors: ["States.ALL"],
   *   interval: "1 second",
   *   maxAttempts: 3,
   *   backoffRate: 2
   * });
   * ```
   */
  public retry(args?: RetryArgs) {
    return this.addRetry(args);
  }

  /**
   * Add a catch behavior to the `Map` state. So if the state fails with any of the
   * specified errors, it'll continue execution to the given `state`.
   *
   * @param state The state to transition to on error.
   * @param args Properties to customize error handling.
   *
   * @example
   *
   * This defaults to.
   *
   * ```ts title="sst.config.ts" {5}
   * sst.aws.StepFunctions.map({
   *   // ...
   * })
   * .catch({
   *   errors: ["States.ALL"]
   * });
   * ```
   */
  public catch(state: State, args: CatchArgs = {}) {
    return this.addCatch(state, args);
  }

  /**
   * @internal
   */
  public getPermissions() {
    return [...this.processor.getPermissions(), ...super.getPermissions()];
  }

  /**
   * Serialize the state into JSON state definition.
   */
  protected toJSON() {
    return {
      Type: "Map",
      Items: this.args.items,
      ItemSelector: this.args.itemSelector,
      ItemProcessor: {
        ProcessorConfig: {
          Mode: "INLINE",
        },
        StartAt: this.processor.name,
        States: this.processor.serialize(),
      },
      MaxConcurrency: this.args.maxConcurrency,
      ...super.toJSON(),
    };
  }
}
