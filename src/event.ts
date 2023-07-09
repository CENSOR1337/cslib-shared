import { Vector2 } from "./utils/Vector2";
import { Vector3 } from "./utils/Vector3";
import { Vector4 } from "./utils/Vector4";
import { CFXEventData } from "./interfaces/CFXEventData";

export class Cfx {
	public static addEventListener = global.addEventListener;
	public static triggerEvent = global.TriggerEvent;
	public static addNetEventListener = global.addNetEventListener;
	public static removeEventListener = global.removeEventListener;
	public static triggerClientEvent = global.TriggerClientEvent;
	public static triggerServerEvent = global.TriggerServerEvent;
}

export type listenerType = (...args: any[]) => void;

export class Event {
	public static getClassFromArguments(...args: any[]): any[] {
		const newArgs: any[] = [];

		for (const arg of args) {
			const obj = this.getObjectClass(arg);
			newArgs.push(obj);
		}
		return newArgs;
	}

	protected static getObjectClass(obj: any): any {
		const objType = obj.type;
		if (!objType) return obj;
		switch (objType) {
			case Vector2.type: {
				return Vector2.create(obj);
			}
			case Vector3.type: {
				return Vector3.create(obj);
			}
			case Vector4.type: {
				return Vector4.create(obj);
			}

			default: {
				return obj;
			}
		}
	}

	public static on(eventName: string, listener: listenerType): CFXEventData {
		Cfx.addEventListener(eventName, listener);
		return { eventName, listener } as CFXEventData;
	}

	public static once(eventName: string, listener: listenerType): CFXEventData {
		const eventData = Event.on(eventName, (...args: any[]) => {
			listener(...args);
			Event.off(eventData);
		});
		return eventData;
	}

	public static off(eventData: CFXEventData): void {
		return Cfx.removeEventListener(eventData.eventName, eventData.listener);
	}

	public static emit(eventName: string, ...args: any[]): void {
		return Cfx.triggerEvent(eventName, ...args);
	}
}

export const off = Event.off;
export const emit = Event.emit;

export function log(...args: any[]) {
	console.log(...args);
}

export function everyTick(callback: () => void): number {
	return setTick(callback);
}

export function clearEveryTick(id: number) {
	return clearTick(id);
}
