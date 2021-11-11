import EventEmitter from 'eventemitter3';
import { createTrackedZone } from '@code-dungeon/zone';

interface Logger {
  debug(message: any): any;

  info(message: any): any;

  warn(message: any): any;

  error(message: any): any;

  fatal(message: any): any;
}

const LOG: Logger = {
  debug: console.info,
  info: console.info,
  warn: console.warn,
  error: console.error,
  fatal: console.error
};

export interface ProcessHandler {
  on(event: ('prepare-exit' | 'exit' | 'flush-log-stream'), callback: Function): ProcessHandler;

  setLogCreate(create: Function): ProcessHandler;
}

interface LoggerCreate {
  (): Logger;
}

interface Callback {
  (...args: Array<any>): void;
}

class Conductor implements ProcessHandler {
  private statusCode: number = 0;
  private emitter: EventEmitter = new EventEmitter();
  private log: Logger = LOG;

  constructor() {
    this.registerShutdownHandler();
  }

  private registerShutdownHandler(): void {
    process.on('SIGINT', this.handleSigInt.bind(this));
    process.on('SIGTERM', this.handleSigTerm.bind(this));
    process.on('uncaughtException', this.handleUncaughtException.bind(this));
  }

  private handleSigInt(): void {
    this.log.info({signal: 'SIGINT'});
    this.exitAsync();
  }

  private handleSigTerm(): void {
    this.log.info({signal: 'SIGTERM'});
    this.exitAsync();
  }

  private handleUncaughtException(error: Error): void {
    this.log.fatal({uncaughtException: error});
    this.exitAsync(1);
  }

  private exitAsync(statusCode: number = 0): void {
    this.statusCode = statusCode;

    const start: Function = this.exitAsyncStart.bind(this);
    const end: Function = this.exitAsyncEnd.bind(this);

    const runner: Function = createTrackedZone(start);
    runner(end);
  }

  private exitAsyncStart(): void {
    this.log.info({state: 'preparing to exit'});
    this.emitter.emit('prepare-exit');
  }

  private exitAsyncEnd(): void {
    this.log.info({status: 'shutdown queue is empty'});
    this.emitter.emit('exit');
    this.exit();
  }

  private exit(): void {
    process.exit(this.statusCode);
  }

  public on(eventName: string | symbol, callback: Callback): ProcessHandler {
    this.emitter.addListener(eventName, callback);
    return this;
  }

  public setLogCreate(create: LoggerCreate): Conductor {
    this.log = create();
    this.log.debug({logger: 'new logger assigned'});
    return this;
  }
}

export const conductor: ProcessHandler = new Conductor();
