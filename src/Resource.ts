import { Event } from "@cfx/shared";
const resourceName = GetCurrentResourceName();

export const isServer = IsDuplicityVersion();
export const isClient = !isServer;

export class Resource {
	public static readonly resourceName: string = resourceName;

	public static on(eventName: string, callback: (...args: any[]) => void): any {
		return Event.on(this.getEventName(eventName), callback);
	}

	public static emit(eventName: string, ...args: any[]): void {
		return Event.emit(this.getEventName(eventName), ...args);
	}

	public static getEventName(eventName: string): string {
		return `${resourceName}:${eventName}`;
	}

	public static onResourceStop(callback: () => void) {
		return Event.on("onResourceStop", (resource: string) => {
			if (resource !== resourceName) return;
			callback();
		});
	}

	public static onResourceStart(callback: () => void) {
		return Event.on("onResourceStart", (resource: string) => {
			if (resource !== resourceName) return;
			callback();
		});
	}
}
