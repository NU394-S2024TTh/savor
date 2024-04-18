import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import AppRouter from "./main";

describe("counter tests", () => {
	test("Counter should be 0 at the start", () => {
		render(<AppRouter />);
		expect(screen.getByText("Savor")).toBeDefined();
	});

	// test("Counter should increment by one when clicked", async () => {
	// 	render(<AppRouter />);
	// 	const counter = screen.getByRole("button");
	// 	fireEvent.click(counter);
	// 	expect(await screen.getByText("count is: 1")).toBeDefined();
	// });
});
