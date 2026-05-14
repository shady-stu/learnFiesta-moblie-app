import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import StatsCard from "../StatsCard";


describe("StatsCard", () => {
  it("shows the completed courses and learned hours", () => {
    const { getByText } = render(
      <StatsCard coursesCompleted={3} hoursLearned={12} />
    );

    expect(getByText("3")).toBeTruthy();
    expect(getByText("12")).toBeTruthy();
    expect(getByText("COURSES COMPLETED")).toBeTruthy();
    expect(getByText("HOURS LEARNED")).toBeTruthy();
  });
});
