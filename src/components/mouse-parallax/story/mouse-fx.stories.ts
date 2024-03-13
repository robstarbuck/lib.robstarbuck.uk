import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "..";
import { mockeyMouse } from "./mockey-mouse";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Components/Mouse FX",
  component: "lib-mouse-parallax",
  parameters: { viewMode: "docs" },
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
};

export default meta;

type Story = StoryObj<Meta>;

export const Card: Story = {
  render: () => {
    return html`
      <lib-mouse-parallax
        style="margin-top:50vh;"
        speed="0.1"
        foreground="#mockey-mouse"
        middleground="#title"
        background="#overline-title, #title-backing"
      >
        ${mockeyMouse}
      </lib-mouse-parallax>
    `;
  },
};
