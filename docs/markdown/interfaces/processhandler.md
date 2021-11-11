> ## [@ticketmaster/conductor](../README.md)

[ProcessHandler](processhandler.md) /

# Interface: ProcessHandler

## Hierarchy

* **ProcessHandler**

## Implemented by

* [Conductor](../classes/conductor.md)

### Index

#### Methods

* [on](processhandler.md#on)
* [setLogCreate](processhandler.md#setlogcreate)

## Methods

###  on

▸ **on**(`event`: "prepare-exit" | "exit" | "flush-log-stream", `callback`: `Function`): *[ProcessHandler](processhandler.md)*

Defined in Conductor.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`event` | "prepare-exit" \| "exit" \| "flush-log-stream" |
`callback` | `Function` |

**Returns:** *[ProcessHandler](processhandler.md)*

___

###  setLogCreate

▸ **setLogCreate**(`create`: `Function`): *[ProcessHandler](processhandler.md)*

Defined in Conductor.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`create` | `Function` |

**Returns:** *[ProcessHandler](processhandler.md)*

___