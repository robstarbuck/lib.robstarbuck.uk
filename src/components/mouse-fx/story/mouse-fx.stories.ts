import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "..";
import { mockeyMouse } from "./mockey-mouse";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Components/Mouse FX",
  component: "lib-mouse-fx",
  parameters: { viewMode: "docs" },
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
};

export default meta;

type Story = StoryObj<Meta>;

export const Card: Story = {
  // SB types are flaky here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: () => {
    return html` <lib-mouse-fx> ${mockeyMouse} </lib-mouse-fx> `;
  },
};
