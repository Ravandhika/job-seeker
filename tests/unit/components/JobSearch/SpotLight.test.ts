import type { Mock } from "vitest";
import { screen, render } from "@testing-library/vue";
import axios from "axios";
import SpotLight from "@/components/JobSearch/SpotLight.vue";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;
describe("SpotLight", () => {
  const mockSpotlightResponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "some image",
          title: "some title",
          description: "some description",
          ...spotlight,
        },
      ],
    });
  };
  it("provides image to parent component", async () => {
    const spotlight = { img: "other image" };
    mockSpotlightResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{slotProps.img}}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("other image");
    expect(text).toBeInTheDocument();
  });
  it("provides title to parent component", async () => {
    const spotlight = { title: "other title" };
    mockSpotlightResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{slotProps.title}}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("other title");
    expect(text).toBeInTheDocument();
  });
  it("provides description to parent component", async () => {
    const spotlight = { description: "other description" };
    mockSpotlightResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{slotProps.description}}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("other description");
    expect(text).toBeInTheDocument();
  });
});
