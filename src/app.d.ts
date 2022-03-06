/// <reference types="@sveltejs/kit" />

import type { IUser } from "./routes/api/_db";

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		sessionid: string;
		user: Omit<IUser, 'password'>;
	}

	// interface Platform {}

	// interface Session {}

	// interface Stuff {}
}
