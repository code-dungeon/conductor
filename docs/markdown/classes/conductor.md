> ## [@ticketmaster/conductor](../README.md)

[Conductor](conductor.md) /

# Class: Conductor

## Hierarchy

* **Conductor**

## Implements

* [ProcessHandler](../interfaces/processhandler.md)

### Index

#### Constructors

* [constructor](conductor.md#constructor)

#### Methods

* [on](conductor.md#on)
* [setLogCreate](conductor.md#setlogcreate)

## Constructors

###  constructor

\+ **new Conductor**(): *[Conductor](conductor.md)*

Defined in Conductor.ts:41

**Returns:** *[Conductor](conductor.md)*

___

## Methods

###  on

▸ **on**(`eventName`: string | symbol, `callback`: [Callback](../interfaces/callback.md)): *[ProcessHandler](../interfaces/processhandler.md)*

Defined in Conductor.ts:93

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string \| symbol |
`callback` | [Callback](../interfaces/callback.md) |

**Returns:** *[ProcessHandler](../interfaces/processhandler.md)*

___

###  setLogCreate

▸ **setLogCreate**(`create`: [LoggerCreate](../interfaces/loggercreate.md)): *[Conductor](conductor.md)*

*Implementation of [ProcessHandler](../interfaces/processhandler.md)*

Defined in Conductor.ts:98

**Parameters:**

Name | Type |
------ | ------ |
`create` | [LoggerCreate](../interfaces/loggercreate.md) |

**Returns:** *[Conductor](conductor.md)*

___