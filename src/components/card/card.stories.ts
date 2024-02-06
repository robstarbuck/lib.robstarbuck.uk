import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { boiler, savings, star } from "./icons";

type ContentOption = "work" | "rewards" | "progression";

const contentOptions: Array<ContentOption> = ["work", "rewards", "progression"];

const argTypes: Meta["argTypes"] = {
  content: {
    defaultValue: contentOptions[0],
    options: contentOptions,
    control: { type: "select" },
  },
};
// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Components/Card",
  argTypes,
  component: "wbl-card",
  parameters: { viewMode: "docs" },
  args: {
    content: contentOptions[0],
  },
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
};

export default meta;

type Story = StoryObj<Meta>;

const renderCardContent = (content: ContentOption) => {
  switch (content) {
    case "work":
      return html`
        <header>
          <wbl-heading>${boiler} My Work</wbl-heading>
          <p>So far this year you have registered...</p>
          <div class="split">
            <wbl-heading>12 Products</wbl-heading>
          </div>
        </header>
        <button class="button">View My Work</button>
      `;
    case "rewards":
      return html`
        <header>
          <wbl-heading>${savings} My Rewards</wbl-heading>
          <p>So far this year you have earned...</p>
          <div class="split">
            <wbl-heading>£445</wbl-heading>
            <span><wbl-heading>|</wbl-heading></span>
            <wbl-heading>750</wbl-heading>
          </div>
        </header>
        <button class="button">View My Rewards</button>
      `;
    case "progression":
      return html`
        <header>
          <wbl-heading>${star} My Progress</wbl-heading>
          <p>Where you stand and what's next</p>
          <div class="split">
            <wbl-heading size="small">Advance Pro</wbl-heading size="small">
            <wbl-heading size="small">Master Tech</wbl-heading size="small">
          </div>
        </header>
        <button class="button">
          More Details
        </button>
      `;
  }
};

export const Card: Story = {
  // SB types are flaky here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (_, context: any) => {
    const cardContext = context.args.context;
    const content = context.args.content;

    return html`
      <wbl-card class="card" context=${cardContext} .interactive=${true}>
        <div slot="image"></div>
        ${renderCardContent(content)}
      </wbl-card>
      <style>
        [slot="image"] {
          display: block;
          background-image: url(./boiler-background.png);
        }
        wbl-card::part(card) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-flow: column;
        }
        wbl-card::part(image) {
          background: red;
        }
        .split {
          display: flex;
          flex-wrap: wrap;
        }
      </style>
    `;
  },
};
